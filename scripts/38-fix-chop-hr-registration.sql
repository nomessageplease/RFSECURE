-- Обновляем ограничение ролей в таблице profiles
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('user', 'guard', 'chop', 'chop_hr', 'moderator', 'admin'));

-- Обновляем триггер для создания профилей с новой ролью
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Пользователь'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'guard')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Проверяем, что триггер существует
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Проверяем текущие роли в базе
SELECT role, COUNT(*) as count 
FROM public.profiles 
GROUP BY role;
