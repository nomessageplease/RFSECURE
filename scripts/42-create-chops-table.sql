-- Создаем таблицу для ЧОПов если она не существует
CREATE TABLE IF NOT EXISTS chops (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(100) NOT NULL,
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  license VARCHAR(50) UNIQUE,
  specialization TEXT[], -- Массив специализаций
  employees INTEGER DEFAULT 0,
  experience INTEGER DEFAULT 0,
  price VARCHAR(100),
  logo TEXT, -- URL логотипа
  verified BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создаем индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_chops_location ON chops(location);
CREATE INDEX IF NOT EXISTS idx_chops_verified ON chops(verified);
CREATE INDEX IF NOT EXISTS idx_chops_rating ON chops(rating);
CREATE INDEX IF NOT EXISTS idx_chops_license ON chops(license);

-- Включаем RLS
ALTER TABLE chops ENABLE ROW LEVEL SECURITY;

-- Политики доступа
CREATE POLICY "Все могут читать ЧОПы" ON chops FOR SELECT USING (true);
CREATE POLICY "Только админы могут создавать ЧОПы" ON chops FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);
CREATE POLICY "Только админы могут обновлять ЧОПы" ON chops FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);
