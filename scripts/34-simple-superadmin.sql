-- Просто обновляем существующий профиль или создаем новый
INSERT INTO public.profiles (
  id,
  email,
  full_name,
  role,
  is_verified,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'admin@chopy.ru',
  'Администратор',
  'admin',
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  is_verified = true,
  updated_at = NOW();

-- Проверяем результат
SELECT email, full_name, role, is_verified 
FROM profiles 
WHERE email LIKE '%@chopy.ru' AND role = 'admin';
