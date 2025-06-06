-- Создаем профили для пользователей, у которых их нет

INSERT INTO public.profiles (id, email, full_name, role, is_verified, created_at, updated_at)
SELECT 
  u.id,
  u.email,
  'Пользователь',
  'guard',
  false,
  NOW(),
  NOW()
FROM auth.users u 
LEFT JOIN profiles p ON u.id = p.id 
WHERE p.id IS NULL;

-- Проверяем результат
SELECT 'Создано профилей: ' || ROW_COUNT() as result;

-- Показываем общую статистику
SELECT 
  'Всего пользователей: ' || (SELECT COUNT(*) FROM auth.users) || 
  ', Всего профилей: ' || (SELECT COUNT(*) FROM profiles) as summary;
