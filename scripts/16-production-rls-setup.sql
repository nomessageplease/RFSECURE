-- Удаляем все старые политики
DROP POLICY IF EXISTS "Пользователи могут просматривать все профили" ON public.profiles;
DROP POLICY IF EXISTS "Пользователи могут обновлять свой профиль" ON public.profiles;
DROP POLICY IF EXISTS "Пользователи могут вставлять свой профиль" ON public.profiles;
DROP POLICY IF EXISTS "Пользователи могут создавать свой профиль" ON public.profiles;
DROP POLICY IF EXISTS "Все могут просматривать профили" ON public.profiles;
DROP POLICY IF EXISTS "Разрешить создание профилей" ON public.profiles;

-- Включаем RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 1. ПОЛИТИКА ПРОСМОТРА: Все могут видеть базовую информацию профилей
CREATE POLICY "profiles_select_policy" 
ON public.profiles FOR SELECT 
USING (true);

-- 2. ПОЛИТИКА ОБНОВЛЕНИЯ: Пользователи могут обновлять только свой профиль
CREATE POLICY "profiles_update_policy" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 3. ПОЛИТИКА УДАЛЕНИЯ: Пользователи могут удалять только свой профиль
CREATE POLICY "profiles_delete_policy" 
ON public.profiles FOR DELETE 
USING (auth.uid() = id);

-- 4. ПОЛИТИКА ВСТАВКИ: Только через триггер или сервисную роль
-- Обычные пользователи НЕ могут напрямую создавать профили
-- Это будет делаться через триггер при регистрации
