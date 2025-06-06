-- Удаляем старые политики
DROP POLICY IF EXISTS "Пользователи могут просматривать все профили" ON public.profiles;
DROP POLICY IF EXISTS "Пользователи могут обновлять свой профиль" ON public.profiles;
DROP POLICY IF EXISTS "Пользователи могут вставлять свой профиль" ON public.profiles;

-- Создаем новые правильные политики
CREATE POLICY "Все могут просматривать профили" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Пользователи могут обновлять свой профиль" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Важно! Разрешаем вставку для новых пользователей
CREATE POLICY "Пользователи могут создавать свой профиль" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Альтернативный вариант - разрешить всем создавать профили (менее безопасно, но работает)
-- CREATE POLICY "Разрешить создание профилей" 
-- ON public.profiles FOR INSERT 
-- WITH CHECK (true);
