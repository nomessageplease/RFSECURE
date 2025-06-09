-- Создаем полную таблицу chops с правильной структурой
CREATE TABLE IF NOT EXISTS chops (
    id SERIAL PRIMARY KEY,
    inn VARCHAR(12) NOT NULL UNIQUE,
    website TEXT NOT NULL,
    logo TEXT NOT NULL,
    name VARCHAR(255),
    description TEXT,
    location VARCHAR(255),
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    license VARCHAR(100),
    specialization TEXT[],
    employees INTEGER DEFAULT 0,
    experience INTEGER DEFAULT 0,
    price TEXT,
    verified BOOLEAN DEFAULT false,
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создаем индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_chops_inn ON chops(inn);
CREATE INDEX IF NOT EXISTS idx_chops_location ON chops(location);
CREATE INDEX IF NOT EXISTS idx_chops_verified ON chops(verified);
CREATE INDEX IF NOT EXISTS idx_chops_rating ON chops(rating DESC);

-- Настраиваем RLS (Row Level Security)
ALTER TABLE chops ENABLE ROW LEVEL SECURITY;

-- Политика для чтения - все могут читать верифицированные ЧОПы
CREATE POLICY IF NOT EXISTS "Anyone can view verified chops" ON chops
    FOR SELECT USING (verified = true);

-- Политика для админов - могут делать все
CREATE POLICY IF NOT EXISTS "Admins can do everything with chops" ON chops
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Политика для модераторов - могут читать и обновлять
CREATE POLICY IF NOT EXISTS "Moderators can view and update chops" ON chops
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'moderator')
        )
    );
