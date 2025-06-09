-- Включаем RLS
ALTER TABLE chops ENABLE ROW LEVEL SECURITY;

-- Создаем политики RLS
CREATE POLICY "Все могут читать chops" ON chops FOR SELECT USING (true);

CREATE POLICY "Только админы могут создавать chops" ON chops FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'moderator')
  )
);

CREATE POLICY "Только админы могут обновлять chops" ON chops FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'moderator')
  )
);
