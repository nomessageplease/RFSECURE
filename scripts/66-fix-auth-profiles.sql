-- Проверяем текущее состояние профилей
SELECT 
  'Пользователи в auth.users' as table_name,
  COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
  'Профили в profiles' as table_name,
  COUNT(*) as count
FROM profiles;

-- Показываем пользователей без профилей
SELECT 
  u.id,
  u.email,
  u.created_at,
  u.raw_user_meta_data,
  p.id as profile_id
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- Создаем недостающие профили
INSERT INTO profiles (id, email, role, full_name, created_at, updated_at)
SELECT 
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'role', 'guard') as role,
  COALESCE(u.raw_user_meta_data->>'full_name', 'Пользователь') as full_name,
  u.created_at,
  NOW()
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- Проверяем результат
SELECT 
  'После исправления - Пользователи' as table_name,
  COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
  'После исправления - Профили' as table_name,
  COUNT(*) as count
FROM profiles;

-- Показываем все профили
SELECT 
  p.id,
  p.email,
  p.role,
  p.full_name,
  u.email as auth_email
FROM profiles p
JOIN auth.users u ON p.id = u.id
ORDER BY p.created_at DESC;
