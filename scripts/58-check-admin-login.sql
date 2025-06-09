-- Проверяем существующих админов
SELECT 
  u.id,
  u.email,
  u.created_at as user_created,
  p.role,
  p.full_name,
  p.is_verified,
  p.created_at as profile_created
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE p.role IN ('admin', 'moderator')
ORDER BY u.created_at DESC;

-- Проверяем все профили
SELECT 
  id,
  email,
  role,
  full_name,
  is_verified,
  created_at
FROM profiles
ORDER BY created_at DESC
LIMIT 10;

-- Проверяем RLS политики для profiles
SELECT 
  policyname,
  cmd,
  permissive,
  roles,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'profiles';

-- Проверяем активные сессии
SELECT 
  s.user_id,
  u.email,
  s.created_at,
  s.updated_at,
  CASE 
    WHEN s.not_after > NOW() THEN 'Активная'
    ELSE 'Истекшая'
  END as session_status
FROM auth.sessions s
JOIN auth.users u ON s.user_id = u.id
ORDER BY s.created_at DESC
LIMIT 5;
