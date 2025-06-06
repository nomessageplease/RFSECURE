-- Простое создание таблицы ЧОПов
CREATE TABLE IF NOT EXISTS chops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  inn TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  status TEXT DEFAULT 'pending',
  rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Простое создание таблицы заявок
CREATE TABLE IF NOT EXISTS chop_connection_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  chop_id UUID,
  new_chop_name TEXT,
  applicant_position TEXT NOT NULL,
  applicant_phone TEXT,
  comment TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Простое создание таблицы назначений HR
CREATE TABLE IF NOT EXISTS chop_hr_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  chop_id UUID NOT NULL,
  role TEXT DEFAULT 'hr',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
