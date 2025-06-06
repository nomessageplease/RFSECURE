-- Проверяем текущую структуру таблицы jobs
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'jobs' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Проверяем, какая колонка существует: applications или applications_count
DO $$
BEGIN
    -- Если существует applications_count, но не applications - переименовываем
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'jobs' 
        AND column_name = 'applications_count' 
        AND table_schema = 'public'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'jobs' 
        AND column_name = 'applications' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.jobs RENAME COLUMN applications_count TO applications;
        RAISE NOTICE 'Переименовали applications_count в applications';
    END IF;
    
    -- Если не существует ни одной из колонок - создаем applications
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'jobs' 
        AND column_name IN ('applications', 'applications_count')
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.jobs ADD COLUMN applications INTEGER DEFAULT 0;
        RAISE NOTICE 'Добавили колонку applications';
    END IF;
END
$$;

-- Проверяем результат
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'jobs' AND table_schema = 'public' AND column_name LIKE '%application%';
