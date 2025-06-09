-- Создаем тестового админа (если его нет)
DO $$
DECLARE
    admin_email TEXT := 'admin@test.com';
    admin_id UUID;
BEGIN
    -- Проверяем, есть ли уже админ
    SELECT id INTO admin_id FROM auth.users WHERE email = admin_email;
    
    IF admin_id IS NULL THEN
        RAISE NOTICE 'Админ не найден. Создайте админа через регистрацию с email: %', admin_email;
    ELSE
        -- Обновляем роль на админа
        UPDATE profiles 
        SET role = 'admin', is_verified = true
        WHERE id = admin_id;
        
        RAISE NOTICE 'Пользователь % назначен админом', admin_email;
    END IF;
END $$;

-- Проверяем результат
SELECT 
  u.email,
  p.role,
  p.is_verified
FROM auth.users u
JOIN profiles p ON u.id = p.id
WHERE p.role = 'admin';
