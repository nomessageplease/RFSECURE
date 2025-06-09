-- Проверяем структуру таблицы chops
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'chops'
ORDER BY ordinal_position;

-- Проверяем индексы на таблице chops
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'chops';

-- Проверяем ограничения на таблице chops
SELECT conname, contype, pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid = 'chops'::regclass;

-- Проверяем существование таблицы
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_name = 'chops'
);
