-- Тестируем работу триггера

-- Проверяем существующие профили
SELECT 'Профилей до теста: ' || COUNT(*) as info FROM profiles;

-- Проверяем пользователей без профилей
SELECT 
  'Пользователей без профилей: ' || COUNT(*) as info
FROM auth.users u 
LEFT JOIN profiles p ON u.id = p.id 
WHERE p.id IS NULL;

-- Показываем последних пользователей
SELECT 
  u.id,
  u.email,
  u.created_at,
  CASE WHEN p.id IS NOT NULL THEN 'Есть профиль' ELSE 'Нет профиля' END as profile_status
FROM auth.users u 
LEFT JOIN profiles p ON u.id = p.id 
ORDER BY u.created_at DESC 
LIMIT 5;
