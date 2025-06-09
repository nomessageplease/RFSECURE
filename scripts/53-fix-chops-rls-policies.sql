-- Удаляем старые политики для таблицы chops
DROP POLICY IF EXISTS "chops_select_policy" ON chops;
DROP POLICY IF EXISTS "chops_insert_policy" ON chops;
DROP POLICY IF EXISTS "chops_update_policy" ON chops;
DROP POLICY IF EXISTS "chops_delete_policy" ON chops;

-- Включаем RLS для таблицы chops
ALTER TABLE chops ENABLE ROW LEVEL SECURITY;

-- Политика для чтения - все могут читать активные ЧОПы
CREATE POLICY "chops_select_policy" ON chops
  FOR SELECT
  USING (true);

-- Политика для вставки - только авторизованные пользователи
CREATE POLICY "chops_insert_policy" ON chops
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Политика для обновления - только создатель или админы/модераторы
CREATE POLICY "chops_update_policy" ON chops
  FOR UPDATE
  USING (
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'moderator')
    )
  );

-- Политика для удаления - только админы
CREATE POLICY "chops_delete_policy" ON chops
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Проверяем созданные политики
SELECT 
  policyname,
  cmd,
  permissive,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'chops';
