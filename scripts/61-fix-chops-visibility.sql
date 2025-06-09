-- Временно отключаем RLS для диагностики
ALTER TABLE chops DISABLE ROW LEVEL SECURITY;

-- Удаляем все существующие политики
DROP POLICY IF EXISTS "chops_select_policy" ON chops;
DROP POLICY IF EXISTS "chops_insert_policy" ON chops;
DROP POLICY IF EXISTS "chops_update_policy" ON chops;
DROP POLICY IF EXISTS "chops_delete_policy" ON chops;

-- Создаем простые политики
CREATE POLICY "chops_select_all" ON chops
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "chops_insert_authenticated" ON chops
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "chops_update_own" ON chops
  FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "chops_delete_own" ON chops
  FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- Включаем RLS обратно
ALTER TABLE chops ENABLE ROW LEVEL SECURITY;

-- Проверяем результат
SELECT 
  id,
  inn,
  name,
  status,
  created_by,
  created_at
FROM chops 
ORDER BY created_at DESC
LIMIT 10;
