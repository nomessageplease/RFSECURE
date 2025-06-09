-- Проверяем последние попытки создания ЧОПов
SELECT 
  id,
  inn,
  name,
  created_by,
  created_at,
  status
FROM chops 
ORDER BY created_at DESC 
LIMIT 5;

-- Проверяем RLS политики для chops
SELECT 
  policyname,
  cmd,
  permissive,
  roles,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'chops';

-- Проверяем права доступа к таблице chops
SELECT 
  grantee,
  privilege_type,
  is_grantable
FROM information_schema.role_table_grants 
WHERE table_name = 'chops';

-- Проверяем структуру таблицы chops
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'chops'
ORDER BY ordinal_position;
