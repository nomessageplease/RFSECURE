-- Обновляем триггер для корректного создания профиля с выбранной ролью
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Создаем обновленную функцию для автоматического создания профиля
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Создаем профиль с информацией из метаданных пользователя
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
    COALESCE(NEW.raw_user_meta_data->>'role', 'guard')::text,
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

-- Проверяем, что триггер создан
SELECT 'Триггер создан успешно' as status;
