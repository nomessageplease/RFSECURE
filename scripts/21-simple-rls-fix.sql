-- Простое исправление RLS политик

-- Отключаем RLS временно для настройки
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Удаляем все старые политики
DROP POLICY IF EXISTS "Пользователи могут просматривать все профили" ON public.profiles;
DROP POLICY IF EXISTS "Пользователи могут обновлять свой профиль" ON public.profiles;
DROP POLICY IF EXISTS "Пользователи могут вставлять свой профиль" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_delete_policy" ON public.profiles;

-- Включаем RLS обратно
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Создаем простые политики
CREATE POLICY "allow_select_profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "allow_insert_profiles" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "allow_update_own_profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
