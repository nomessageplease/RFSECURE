-- Создание таблицы profiles
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

-- Включение RLS для profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Политики для profiles
DROP POLICY IF EXISTS "Пользователи могут просматривать все профили" ON public.profiles;
CREATE POLICY "Пользователи могут просматривать все профили" 
ON public.profiles FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Пользователи могут обновлять свой профиль" ON public.profiles;
CREATE POLICY "Пользователи могут обновлять свой профиль" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Пользователи могут вставлять свой профиль" ON public.profiles;
CREATE POLICY "Пользователи могут вставлять свой профиль" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Создание таблицы jobs
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
    applications INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Создание индексов для jobs
CREATE INDEX IF NOT EXISTS idx_jobs_company_id ON public.jobs(company_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON public.jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON public.jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON public.jobs(created_at);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON public.jobs(category);

-- Включение RLS для jobs
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Политики для jobs
DROP POLICY IF EXISTS "Все могут просматривать активные вакансии" ON public.jobs;
CREATE POLICY "Все могут просматривать активные вакансии" ON public.jobs
    FOR SELECT USING (status = 'active' OR status = 'pending');

DROP POLICY IF EXISTS "Пользователи могут создавать вакансии" ON public.jobs;
CREATE POLICY "Пользователи могут создавать вакансии" ON public.jobs
    FOR INSERT WITH CHECK (auth.uid() = company_id);

DROP POLICY IF EXISTS "Пользователи могут обновлять свои вакансии" ON public.jobs;
CREATE POLICY "Пользователи могут обновлять свои вакансии" ON public.jobs
    FOR UPDATE USING (auth.uid() = company_id);

DROP POLICY IF EXISTS "Пользователи могут удалять свои вакансии" ON public.jobs;
CREATE POLICY "Пользователи могут удалять свои вакансии" ON public.jobs
    FOR DELETE USING (auth.uid() = company_id);

-- Создание таблицы job_applications
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
    applicant_id UUID NOT NULL,
    applicant_name VARCHAR(255),
    applicant_email VARCHAR(255),
    applicant_phone VARCHAR(50),
    cover_letter TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Включение RLS для job_applications
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Политики для job_applications
DROP POLICY IF EXISTS "Пользователи видят свои отклики" ON public.job_applications;
CREATE POLICY "Пользователи видят свои отклики" ON public.job_applications
    FOR SELECT USING (auth.uid() = applicant_id);

DROP POLICY IF EXISTS "Работодатели видят отклики на свои вакансии" ON public.job_applications;
CREATE POLICY "Работодатели видят отклики на свои вакансии" ON public.job_applications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.jobs 
            WHERE id = job_id AND company_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Пользователи могут создавать отклики" ON public.job_applications;
CREATE POLICY "Пользователи могут создавать отклики" ON public.job_applications
    FOR INSERT WITH CHECK (auth.uid() = applicant_id);

DROP POLICY IF EXISTS "Пользователи могут обновлять свои отклики" ON public.job_applications;
CREATE POLICY "Пользователи могут обновлять свои отклики" ON public.job_applications
    FOR UPDATE USING (auth.uid() = applicant_id);
