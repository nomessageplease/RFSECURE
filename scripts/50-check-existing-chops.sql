-- Проверяем существует ли таблица chops
SELECT table_name, table_schema 
FROM information_schema.tables 
WHERE table_name = 'chops';

-- Если таблица существует, показываем её структуру
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'chops' 
ORDER BY ordinal_position;
