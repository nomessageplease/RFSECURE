-- Создание таблицы профилей пользователей
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'guard', 'chop', 'moderator', 'admin')),
  phone TEXT,
  city TEXT,
  company_name TEXT,
  company_inn TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включение RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Политики безопасности
CREATE POLICY "Пользователи могут просматривать все профили" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Пользователи могут обновлять свой профиль" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Пользователи могут вставлять свой профиль" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Функция для обновления updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер для обновления updated_at
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
