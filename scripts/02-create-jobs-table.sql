-- Проверка и создание таблицы profiles, если она не существует
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
        CREATE TABLE public.profiles (
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
    END IF;
END
$$;

-- Создание таблицы вакансий
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company_id UUID NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT[],
    benefits TEXT[],
    location VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    salary_from INTEGER,
    salary_to INTEGER,
    salary_period VARCHAR(50) DEFAULT 'месяц',
    schedule VARCHAR(100),
    experience_level VARCHAR(100),
    job_type VARCHAR(50) DEFAULT 'full-time',
    category VARCHAR(100) DEFAULT 'security',
    is_urgent BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'pending',
    views INTEGER DEFAULT 0,
    applications_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Создание индексов для оптимизации поиска
CREATE INDEX IF NOT EXISTS idx_jobs_company_id ON public.jobs(company_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON public.jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON public.jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON public.jobs(created_at);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON public.jobs(category);

-- Включение RLS (Row Level Security)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Политики безопасности для таблицы jobs
-- Все могут читать активные вакансии
CREATE POLICY "Все могут просматривать активные вакансии" ON public.jobs
    FOR SELECT USING (status = 'active' OR status = 'pending');

-- Только владельцы могут создавать вакансии
CREATE POLICY "Пользователи могут создавать вакансии" ON public.jobs
    FOR INSERT WITH CHECK (auth.uid() = company_id);

-- Только владельцы могут обновлять свои вакансии
CREATE POLICY "Пользователи могут обновлять свои вакансии" ON public.jobs
    FOR UPDATE USING (auth.uid() = company_id);

-- Только владельцы могут удалять свои вакансии
CREATE POLICY "Пользователи могут удалять свои вакансии" ON public.jobs
    FOR DELETE USING (auth.uid() = company_id);

-- Модераторы и админы могут видеть все вакансии
CREATE POLICY "Модераторы видят все вакансии" ON public.jobs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() 
            AND role IN ('moderator', 'admin')
        )
    );

-- Создание функции для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Создание триггера для автоматического обновления updated_at
CREATE TRIGGER update_jobs_updated_at 
    BEFORE UPDATE ON public.jobs 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Создание таблицы для откликов на вакансии
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
    applicant_id UUID NOT NULL,
    message TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(job_id, applicant_id)
);

-- Включение RLS для откликов
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Политики для откликов
CREATE POLICY "Пользователи видят свои отклики" ON public.job_applications
    FOR SELECT USING (auth.uid() = applicant_id);

CREATE POLICY "Работодатели видят отклики на свои вакансии" ON public.job_applications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.jobs 
            WHERE id = job_id AND company_id = auth.uid()
        )
    );

CREATE POLICY "Пользователи могут создавать отклики" ON public.job_applications
    FOR INSERT WITH CHECK (auth.uid() = applicant_id);

CREATE POLICY "Пользователи могут обновлять свои отклики" ON public.job_applications
    FOR UPDATE USING (auth.uid() = applicant_id);
