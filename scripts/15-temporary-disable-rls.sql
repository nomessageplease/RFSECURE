-- ВРЕМЕННО отключаем RLS для отладки (НЕ для продакшена!)
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- После того как все заработает, включите обратно:
-- ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
