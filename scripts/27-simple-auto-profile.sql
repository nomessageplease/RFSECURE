-- Простая версия триггера для автоматического создания профилей

-- Сначала удаляем старые триггеры и функции
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Создаем простую функцию
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, is_verified)
  VALUES (NEW.id, NEW.email, 'Пользователь', 'guard', false);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Создаем триггер
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Проверяем что создалось
SELECT 'Функция создана' as status WHERE EXISTS (
  SELECT 1 FROM pg_proc WHERE proname = 'handle_new_user'
);

SELECT 'Триггер создан' as status WHERE EXISTS (
  SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
);
