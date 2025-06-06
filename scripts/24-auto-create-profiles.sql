-- Удаляем старый триггер если есть
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Создаем функцию для автоматического создания профиля
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Создаем профиль с базовой информацией
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    is_verified,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Пользователь'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'guard'),
    false,
    NOW(),
    NOW()
  );
  
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    -- Логируем ошибку, но не прерываем регистрацию
    RAISE LOG 'Ошибка создания профиля для пользователя %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- Создаем триггер на регистрацию нового пользователя
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Даем права на выполнение функции
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

-- Проверяем, что триггер создан
SELECT pg_get_functiondef(oid) FROM pg_proc WHERE proname = 'handle_new_user';
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
