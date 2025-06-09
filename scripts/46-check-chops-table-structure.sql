-- Проверяем структуру таблицы chops после обновления
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'chops'
ORDER BY ordinal_position;

-- Проверяем индексы на таблице chops
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'chops';

-- Проверяем ограничения уникальности
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'chops'::regclass;
