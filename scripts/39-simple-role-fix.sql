-- Простое обновление ограничения ролей
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Добавляем новое ограничение с поддержкой chop_hr
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('user', 'guard', 'chop', 'chop_hr', 'moderator', 'admin'));

-- Проверяем текущие роли
SELECT role, COUNT(*) FROM profiles GROUP BY role;
