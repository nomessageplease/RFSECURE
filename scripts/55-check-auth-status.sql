-- Проверяем активные сессии пользователей
SELECT 
  s.id as session_id,
  s.user_id,
  u.email,
  s.created_at,
  s.updated_at,
  s.not_after,
  CASE 
    WHEN s.not_after > NOW() THEN 'Активная'
    ELSE 'Истекшая'
  END as session_status
FROM auth.sessions s
JOIN auth.users u ON s.user_id = u.id
ORDER BY s.created_at DESC
LIMIT 10;

-- Проверяем пользователей и их профили
SELECT 
  u.id,
  u.email,
  u.created_at as user_created,
  p.role,
  p.created_at as profile_created
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
ORDER BY u.created_at DESC
LIMIT 10;

-- Проверяем RLS политики для profiles
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'profiles';
