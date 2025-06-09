-- Ищем все ЧОПы в базе данных (игнорируя RLS)
SELECT 
  id,
  inn,
  name,
  status,
  created_by,
  created_at,
  updated_at
FROM chops 
ORDER BY created_at DESC;

-- Проверяем RLS политики для chops
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'chops';

-- Проверяем, включен ли RLS для таблицы chops
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'chops';

-- Ищем ЧОПы с конкретным ИНН
SELECT 
  id,
  inn,
  name,
  status,
  created_by,
  created_at
FROM chops 
WHERE inn LIKE '%булат%' OR name ILIKE '%булат%';
