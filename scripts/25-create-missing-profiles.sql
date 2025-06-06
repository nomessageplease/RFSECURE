-- Создаем профили для существующих пользователей, у которых их нет
INSERT INTO public.profiles (
  id,
  email,
  full_name,
  role,
  is_verified,
  created_at,
  updated_at
)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', 'Пользователь'),
  COALESCE(au.raw_user_meta_data->>'role', 'guard'),
  false,
  NOW(),
  NOW()
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;

-- Проверяем результат
SELECT 
  au.id, 
  au.email, 
  p.id IS NOT NULL as has_profile,
  p.role,
  p.full_name
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
ORDER BY au.created_at DESC;
