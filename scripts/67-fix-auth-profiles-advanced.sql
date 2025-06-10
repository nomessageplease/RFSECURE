-- Включаем подробные логи для отладки
SET client_min_messages TO DEBUG;

-- Проверяем текущее состояние таблиц
SELECT 'Проверка состояния таблиц' as operation;
SELECT 
  'Пользователи в auth.users' as table_name,
  COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
  'Профили в profiles' as table_name,
  COUNT(*) as count
FROM profiles;

-- Проверяем структуру таблицы profiles
SELECT 'Структура таблицы profiles' as operation;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'profiles';

-- Проверяем RLS политики для таблицы profiles
SELECT 'RLS политики для profiles' as operation;
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- Проверяем пользователей без профилей
SELECT 'Пользователи без профилей' as operation;
SELECT 
  u.id,
  u.email,
  u.created_at,
  u.raw_user_meta_data
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- Создаем недостающие профили с правильными ролями
SELECT 'Создание недостающих профилей' as operation;
INSERT INTO profiles (id, email, role, full_name, created_at, updated_at)
SELECT 
  u.id,
  u.email,
  COALESCE(
    CASE 
      WHEN u.raw_user_meta_data->>'role' = 'admin' THEN 'admin'
      WHEN u.raw_user_meta_data->>'role' = 'moderator' THEN 'moderator'
      WHEN u.raw_user_meta_data->>'role' = 'chop_hr' THEN 'chop_hr'
      ELSE 'guard'
    END,
    'guard'
  ) as role,
  COALESCE(u.raw_user_meta_data->>'full_name', 'Пользователь') as full_name,
  u.created_at,
  NOW()
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- Проверяем профили с некорректными ролями
SELECT 'Профили с некорректными ролями' as operation;
SELECT 
  p.id,
  p.email,
  p.role,
  u.raw_user_meta_data->>'role' as auth_role
FROM profiles p
JOIN auth.users u ON p.id = u.id
WHERE 
  (u.raw_user_meta_data->>'role' IS NOT NULL AND p.role != u.raw_user_meta_data->>'role')
  OR p.role IS NULL;

-- Исправляем профили с некорректными ролями
SELECT 'Исправление профилей с некорректными ролями' as operation;
UPDATE profiles p
SET 
  role = CASE 
    WHEN u.raw_user_meta_data->>'role' = 'admin' THEN 'admin'
    WHEN u.raw_user_meta_data->>'role' = 'moderator' THEN 'moderator'
    WHEN u.raw_user_meta_data->>'role' = 'chop_hr' THEN 'chop_hr'
    ELSE 'guard'
  END,
  updated_at = NOW()
FROM auth.users u
WHERE 
  p.id = u.id 
  AND u.raw_user_meta_data->>'role' IS NOT NULL 
  AND p.role != u.raw_user_meta_data->>'role';

-- Проверяем, что у всех профилей есть роли
SELECT 'Профили без ролей' as operation;
SELECT id, email FROM profiles WHERE role IS NULL;

-- Исправляем профили без ролей
SELECT 'Исправление профилей без ролей' as operation;
UPDATE profiles SET role = 'guard', updated_at = NOW() WHERE role IS NULL;

-- Проверяем результат
SELECT 'Результат исправлений' as operation;
SELECT 
  'После исправления - Пользователи' as table_name,
  COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
  'После исправления - Профили' as table_name,
  COUNT(*) as count
FROM profiles;

-- Проверяем RLS политики для profiles
SELECT 'Проверка RLS политик' as operation;
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- Убеждаемся, что RLS включен для profiles
SELECT 'Проверка включения RLS' as operation;
SELECT relname, relrowsecurity FROM pg_class WHERE relname = 'profiles';

-- Включаем RLS для profiles, если он выключен
SELECT 'Включение RLS для profiles' as operation;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Создаем базовые политики RLS, если их нет
SELECT 'Создание базовых политик RLS' as operation;

-- Удаляем существующие политики для profiles, чтобы избежать конфликтов
DROP POLICY IF EXISTS profiles_select_policy ON profiles;
DROP POLICY IF EXISTS profiles_insert_policy ON profiles;
DROP POLICY IF EXISTS profiles_update_policy ON profiles;
DROP POLICY IF EXISTS profiles_delete_policy ON profiles;

-- Создаем новые политики
-- Политика для SELECT: пользователи могут видеть свой профиль, админы и модераторы видят все
CREATE POLICY profiles_select_policy ON profiles
  FOR SELECT USING (
    auth.uid() = id OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND (role = 'admin' OR role = 'moderator'))
  );

-- Политика для INSERT: только аутентифицированные пользователи могут создавать свой профиль
CREATE POLICY profiles_insert_policy ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Политика для UPDATE: пользователи могут обновлять свой профиль, админы могут обновлять любой
CREATE POLICY profiles_update_policy ON profiles
  FOR UPDATE USING (
    auth.uid() = id OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Политика для DELETE: только админы могут удалять профили
CREATE POLICY profiles_delete_policy ON profiles
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Проверяем созданные политики
SELECT 'Созданные политики RLS' as operation;
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- Показываем все профили для проверки
SELECT 'Все профили после исправлений' as operation;
SELECT 
  p.id,
  p.email,
  p.role,
  p.full_name,
  u.email as auth_email,
  u.raw_user_meta_data
FROM profiles p
JOIN auth.users u ON p.id = u.id
ORDER BY p.created_at DESC;

-- Создаем тестового админа, если его нет
SELECT 'Создание тестового админа' as operation;
DO $$
DECLARE
  admin_exists boolean;
  admin_id uuid;
BEGIN
  SELECT EXISTS(SELECT 1 FROM auth.users WHERE email = 'admin@example.com') INTO admin_exists;
  
  IF NOT admin_exists THEN
    -- Создаем пользователя в auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) 
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@example.com',
      crypt('admin123', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"role":"admin","full_name":"Администратор"}',
      NOW(),
      NOW(),
      '',
      '',
      '',
      ''
    )
    RETURNING id INTO admin_id;
    
    -- Создаем профиль для админа
    INSERT INTO profiles (id, email, role, full_name, created_at, updated_at)
    VALUES (
      admin_id,
      'admin@example.com',
      'admin',
      'Администратор',
      NOW(),
      NOW()
    );
    
    RAISE NOTICE 'Создан тестовый админ: admin@example.com / admin123';
  ELSE
    RAISE NOTICE 'Тестовый админ уже существует';
  END IF;
END $$;

-- Финальная проверка
SELECT 'Финальная проверка' as operation;
SELECT 
  'Пользователи в auth.users' as table_name,
  COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
  'Профили в profiles' as table_name,
  COUNT(*) as count
FROM profiles
UNION ALL
SELECT 
  'Админы' as table_name,
  COUNT(*) as count
FROM profiles
WHERE role = 'admin';
