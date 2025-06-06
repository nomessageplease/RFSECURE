-- Проверяем структуру таблицы jobs (если существует)
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'jobs'
ORDER BY ordinal_position;
