-- Проверяем созданную таблицу
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'chops' 
ORDER BY ordinal_position;
