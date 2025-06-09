-- Проверяем создание ЧОПов и RLS политики
SELECT 
  id,
  inn,
  name,
  created_by,
  created_at,
  status
FROM chops 
ORDER BY created_at DESC 
LIMIT 10;

-- Проверяем RLS политики для таблицы chops
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

-- Проверяем права доступа к таблице
SELECT 
  table_name,
  privilege_type,
  grantee
FROM information_schema.table_privileges 
WHERE table_name = 'chops';
