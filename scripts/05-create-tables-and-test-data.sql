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

-- Создание таблицы вакансий, если она не существует
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'jobs') THEN
        CREATE TABLE public.jobs (
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
    END IF;
END
$$;

-- Создание таблицы для откликов на вакансии, если она не существует
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'job_applications') THEN
        CREATE TABLE public.job_applications (
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
            
        CREATE POLICY "Модераторы и админы могут просматривать все отклики" ON public.job_applications
            FOR SELECT USING (
                EXISTS (
                    SELECT 1 FROM public.profiles 
                    WHERE profiles.id = auth.uid() 
                    AND profiles.role IN ('moderator', 'admin')
                )
            );
    END IF;
END
$$;

-- Добавление тестовых пользователей
INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    phone,
    city,
    company_name,
    is_verified,
    created_at,
    updated_at
) VALUES 
-- ЧОП пользователи
(
    '11111111-1111-1111-1111-111111111111',
    'avangard@test.com',
    'Иван Петрович Директоров',
    'chop',
    '+7 (495) 123-45-67',
    'Москва',
    'Охранное Агентство Авангард',
    TRUE,
    NOW(),
    NOW()
),
(
    '22222222-2222-2222-2222-222222222222',
    'ilgoriya@test.com',
    'Сергей Николаевич Управляющий',
    'chop',
    '+7 (495) 234-56-78',
    'Москва',
    'ЧОП Ильгория',
    TRUE,
    NOW(),
    NOW()
),
(
    '33333333-3333-3333-3333-333333333333',
    'stb@test.com',
    'Александр Владимирович Безопасников',
    'chop',
    '+7 (495) 345-67-89',
    'Москва',
    'Частная Охранная организация Специальные Технологии Безопасности',
    TRUE,
    NOW(),
    NOW()
),
-- Охранники
(
    '44444444-4444-4444-4444-444444444444',
    'guard1@test.com',
    'Иван Петрович Сидоров',
    'guard',
    '+7 (495) 456-78-90',
    'Москва',
    NULL,
    TRUE,
    NOW(),
    NOW()
),
(
    '55555555-5555-5555-5555-555555555555',
    'guard2@test.com',
    'Сергей Николаевич Козлов',
    'guard',
    '+7 (812) 567-89-01',
    'Санкт-Петербург',
    NULL,
    TRUE,
    NOW(),
    NOW()
),
(
    '66666666-6666-6666-6666-666666666666',
    'guard3@test.com',
    'Алексей Иванович Смирнов',
    'guard',
    '+7 (495) 678-90-12',
    'Москва',
    NULL,
    FALSE,
    NOW(),
    NOW()
),
-- Модератор
(
    '77777777-7777-7777-7777-777777777777',
    'moderator@test.com',
    'Анна Сергеевна Модераторова',
    'moderator',
    '+7 (495) 789-01-23',
    'Москва',
    NULL,
    TRUE,
    NOW(),
    NOW()
),
-- Админ
(
    '88888888-8888-8888-8888-888888888888',
    'admin@test.com',
    'Дмитрий Александрович Администраторов',
    'admin',
    '+7 (495) 890-12-34',
    'Москва',
    NULL,
    TRUE,
    NOW(),
    NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Добавляем вакансии с привязкой к реальным пользователям
INSERT INTO public.jobs (
    title,
    company_id,
    company_name,
    description,
    requirements,
    benefits,
    location,
    address,
    salary_from,
    salary_to,
    salary_period,
    schedule,
    experience_level,
    job_type,
    category,
    is_urgent,
    is_verified,
    status,
    views,
    applications,
    created_at,
    updated_at
) VALUES 
-- Вакансии от Охранного Агентства Авангард
(
    'Охранник 6 разряд',
    '11111111-1111-1111-1111-111111111111',
    'Охранное Агентство Авангард',
    'Требуется охранник для работы в крупном торговом центре. Обеспечение безопасности посетителей и персонала. Работа в современном ТЦ с хорошими условиями труда.',
    ARRAY['Удостоверение охранника 6 разряда', 'Опыт работы в ТЦ от 1 года', 'Ответственность', 'Пунктуальность'],
    ARRAY['Официальное трудоустройство', 'Полный соцпакет', 'Обучение за счет компании', 'Карьерный рост'],
    'Москва',
    'ТЦ Европейский, пл. Киевского Вокзала, 2',
    63500,
    109000,
    'месяц',
    '2/2',
    'Опыт от 1 года',
    'full-time',
    'security',
    TRUE,
    TRUE,
    'active',
    234,
    12,
    NOW() - INTERVAL '2 days',
    NOW()
),
(
    'Старший охранник смены',
    '11111111-1111-1111-1111-111111111111',
    'Охранное Агентство Авангард',
    'Требуется старший охранник для руководства сменой в торговом центре. Координация работы охранников, контроль соблюдения инструкций.',
    ARRAY['Удостоверение охранника 6 разряда', 'Опыт руководства от 2 лет', 'Знание систем безопасности', 'Стрессоустойчивость'],
    ARRAY['Высокая зарплата', 'Премии за результат', 'Корпоративное обучение', 'ДМС'],
    'Москва',
    'ТЦ Европейский',
    85000,
    120000,
    'месяц',
    '2/2',
    'Опыт от 2 лет',
    'full-time',
    'senior',
    FALSE,
    TRUE,
    'active',
    156,
    8,
    NOW() - INTERVAL '1 day',
    NOW()
),

-- Вакансии от ЧОП Ильгория
(
    'Охранник (вахта)',
    '22222222-2222-2222-2222-222222222222',
    'ЧОП Ильгория',
    'Ищем опытного охранника для работы вахтовым методом. Охрана промышленных объектов, контроль пропускного режима.',
    ARRAY['Удостоверение охранника 4-6 разряда', 'Опыт работы от 1 года', 'Готовность к вахте', 'Физическая подготовка'],
    ARRAY['Высокая зарплата', 'Проживание предоставляется', 'Питание', 'Премии'],
    'Московская область',
    'Дмитровский район',
    93000,
    96100,
    'месяц',
    'Вахта 15/15',
    'Опыт от 1 года',
    'full-time',
    'security',
    TRUE,
    TRUE,
    'pending',
    89,
    5,
    NOW() - INTERVAL '3 hours',
    NOW()
),
(
    'Охранник-кинолог',
    '22222222-2222-2222-2222-222222222222',
    'ЧОП Ильгория',
    'Требуется охранник-кинолог для работы на складском комплексе. Патрулирование территории со служебной собакой.',
    ARRAY['Удостоверение охранника', 'Опыт работы с собаками', 'Удостоверение кинолога', 'Готовность к ночным сменам'],
    ARRAY['Достойная оплата', 'Предоставление служебной собаки', 'Обучение', 'Соцпакет'],
    'Москва',
    'МКАД, 47 км',
    75000,
    85000,
    'месяц',
    'Сменный график',
    'Опыт от 2 лет',
    'full-time',
    'security',
    FALSE,
    TRUE,
    'active',
    67,
    3,
    NOW() - INTERVAL '5 hours',
    NOW()
),

-- Вакансии от СТБ
(
    'Охранник в бизнес-центр',
    '33333333-3333-3333-3333-333333333333',
    'Частная Охранная организация Специальные Технологии Безопасности',
    'Требуется охранник для работы в бизнес-центре класса А. Контроль доступа, видеонаблюдение, работа с посетителями.',
    ARRAY['Удостоверение охранника 4-6 разряда', 'Ответственность', 'Пунктуальность', 'Грамотная речь'],
    ARRAY['Своевременная оплата', 'Комфортные условия', 'Дружный коллектив', 'Обучение'],
    'Москва',
    'м. Тульская, БЦ Технопарк',
    45000,
    55000,
    'месяц',
    '1/3',
    'Без опыта',
    'full-time',
    'security',
    FALSE,
    TRUE,
    'active',
    123,
    7,
    NOW() - INTERVAL '1 day',
    NOW()
),
(
    'Охранник-консьерж',
    '33333333-3333-3333-3333-333333333333',
    'Частная Охранная организация Специальные Технологии Безопасности',
    'Требуется охранник-консьерж в элитный жилой комплекс. Контроль доступа, помощь жильцам, поддержание порядка.',
    ARRAY['Удостоверение охранника', 'Презентабельный внешний вид', 'Вежливость', 'Знание ПК'],
    ARRAY['Стабильная зарплата', 'Работа в элитном ЖК', 'Обучение этикету', 'Премии'],
    'Москва',
    'ЖК Воробьевы горы',
    60000,
    70000,
    'месяц',
    '2/2',
    'Опыт от 6 месяцев',
    'full-time',
    'security',
    FALSE,
    TRUE,
    'pending',
    45,
    2,
    NOW() - INTERVAL '6 hours',
    NOW()
);

-- Добавляем тестовые отклики
DO $$
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'job_applications') THEN
        INSERT INTO public.job_applications (
            job_id,
            applicant_id,
            applicant_name,
            applicant_email,
            applicant_phone,
            cover_letter,
            status,
            created_at,
            updated_at
        ) 
        SELECT 
            j.id,
            '44444444-4444-4444-4444-444444444444',
            'Иван Петрович Сидоров',
            'guard1@test.com',
            '+7 (495) 456-78-90',
            'Здравствуйте! Имею 8 лет опыта работы охранником в торговых центрах. Ответственный, пунктуальный. Готов приступить к работе немедленно.',
            'pending',
            NOW() - INTERVAL '1 day',
            NOW()
        FROM public.jobs j
        WHERE j.title = 'Охранник 6 разряд'
        LIMIT 1;

        INSERT INTO public.job_applications (
            job_id,
            applicant_id,
            applicant_name,
            applicant_email,
            applicant_phone,
            cover_letter,
            status,
            created_at,
            updated_at
        ) 
        SELECT 
            j.id,
            '44444444-4444-4444-4444-444444444444',
            'Иван Петрович Сидоров',
            'guard1@test.com',
            '+7 (495) 456-78-90',
            'Заинтересован в данной вакансии. Имею опыт работы в офисных зданиях.',
            'reviewed',
            NOW() - INTERVAL '2 days',
            NOW()
        FROM public.jobs j
        WHERE j.title = 'Охранник в бизнес-центр'
        LIMIT 1;

        INSERT INTO public.job_applications (
            job_id,
            applicant_id,
            applicant_name,
            applicant_email,
            applicant_phone,
            cover_letter,
            status,
            created_at,
            updated_at
        ) 
        SELECT 
            j.id,
            '55555555-5555-5555-5555-555555555555',
            'Сергей Николаевич Козлов',
            'guard2@test.com',
            '+7 (812) 567-89-01',
            'Имею 12 лет опыта работы охранником, из них 5 лет работал с служебными собаками. Есть удостоверение кинолога.',
            'accepted',
            NOW() - INTERVAL '3 days',
            NOW()
        FROM public.jobs j
        WHERE j.title = 'Охранник-кинолог'
        LIMIT 1;

        INSERT INTO public.job_applications (
            job_id,
            applicant_id,
            applicant_name,
            applicant_email,
            applicant_phone,
            cover_letter,
            status,
            created_at,
            updated_at
        ) 
        SELECT 
            j.id,
            '66666666-6666-6666-6666-666666666666',
            'Алексей Иванович Смирнов',
            'guard3@test.com',
            '+7 (495) 678-90-12',
            'Рассматриваю возможность карьерного роста. Имею опыт руководства небольшой командой.',
            'pending',
            NOW() - INTERVAL '5 hours',
            NOW()
        FROM public.jobs j
        WHERE j.title = 'Старший охранник смены'
        LIMIT 1;

        -- Обновляем счетчики откликов в вакансиях
        UPDATE public.jobs SET applications = (
            SELECT COUNT(*) FROM public.job_applications WHERE job_applications.job_id = jobs.id
        );
    END IF;
END
$$;
