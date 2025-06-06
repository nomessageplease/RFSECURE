-- Проверяем статус профилей
SELECT 
  'Всего пользователей' as info, 
  COUNT(*) as count 
FROM auth.users
UNION ALL
SELECT 
  'Пользователей с профилями', 
  COUNT(*) 
FROM public.profiles
UNION ALL
SELECT 
  'Пользователей без профилей', 
  COUNT(au.id) 
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;

-- Проверяем распределение ролей
SELECT 
  role, 
  COUNT(*) as count 
FROM public.profiles 
GROUP BY role 
ORDER BY count DESC;

-- Проверяем последних 10 пользователей
SELECT 
  au.email, 
  p.full_name, 
  p.role, 
  p.is_verified,
  au.created_at
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
ORDER BY au.created_at DESC
LIMIT 10;
