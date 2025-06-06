-- Добавляем суперадмина для тестирования переключения ролей
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
  'superadmin@chopy.ru',
  'Суперадминистратор',
  'admin',
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO UPDATE SET
  role = 'admin',
  is_verified = true,
  updated_at = NOW();
