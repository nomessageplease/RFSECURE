-- Удаляем существующую таблицу если есть проблемы
DROP TABLE IF EXISTS chops CASCADE;

-- Создаем таблицу chops с правильной структурой
CREATE TABLE chops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  inn TEXT NOT NULL UNIQUE,
  name TEXT,
  website TEXT,
  description TEXT,
  address TEXT,
  phone TEXT,
  email TEXT,
  license_number TEXT,
  logo_url TEXT,
  status TEXT DEFAULT 'verified',
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  employees_count INTEGER,
  founded_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

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

-- Проверяем созданную таблицу
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'chops' 
ORDER BY ordinal_position;
