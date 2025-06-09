-- Проверяем структуру таблицы chops
SELECT 
  column_name, 
  data_type, 
  is_nullable 
FROM 
  information_schema.columns 
WHERE 
  table_name = 'chops' 
ORDER BY 
  ordinal_position;

-- Проверяем существующие записи в таблице chops
SELECT * FROM chops LIMIT 10;
