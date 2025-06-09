-- Находим дублирующиеся ЧОПы по ИНН
WITH duplicate_chops AS (
  SELECT 
    inn,
    COUNT(*) as count,
    array_agg(id ORDER BY created_at) as ids,
    array_agg(created_at ORDER BY created_at) as dates
  FROM chops 
  GROUP BY inn 
  HAVING COUNT(*) > 1
)
SELECT 
  inn,
  count,
  ids,
  dates
FROM duplicate_chops;

-- Удаляем дублирующиеся записи (оставляем только самую новую)
WITH duplicate_chops AS (
  SELECT 
    id,
    ROW_NUMBER() OVER (PARTITION BY inn ORDER BY created_at DESC) as rn
  FROM chops
)
DELETE FROM chops 
WHERE id IN (
  SELECT id 
  FROM duplicate_chops 
  WHERE rn > 1
);

-- Проверяем результат
SELECT 
  inn,
  name,
  created_at,
  COUNT(*) OVER (PARTITION BY inn) as inn_count
FROM chops 
ORDER BY inn, created_at DESC;
