-- Проверяем все ЧОПы в базе данных
SELECT 
  id,
  inn,
  name,
  website,
  logo_url,
  status,
  created_by,
  created_at
FROM chops 
ORDER BY created_at DESC;

-- Проверяем RLS политики
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

-- Проверяем, включен ли RLS
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE tablename = 'chops';
