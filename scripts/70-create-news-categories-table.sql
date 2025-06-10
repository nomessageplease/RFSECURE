-- Создаем таблицу для категорий новостей
CREATE TABLE IF NOT EXISTS news_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#6B7280',
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Добавляем базовые категории
INSERT INTO news_categories (id, name, description, color, sort_order) VALUES
('industry', 'Отрасль', 'Новости охранной отрасли', '#3B82F6', 1),
('legislation', 'Законодательство', 'Изменения в законодательстве', '#EF4444', 2),
('technology', 'Технологии', 'Новые технологии в сфере безопасности', '#10B981', 3),
('companies', 'Компании', 'Новости компаний', '#F59E0B', 4),
('general', 'Общие', 'Общие новости', '#6B7280', 5)
ON CONFLICT (id) DO NOTHING;

-- Добавляем RLS политики
ALTER TABLE news_categories ENABLE ROW LEVEL SECURITY;

-- Политика для чтения - все могут читать активные категории
CREATE POLICY "Anyone can read active categories" ON news_categories
  FOR SELECT USING (is_active = true);

-- Политика для админов - полный доступ
CREATE POLICY "Admins can manage categories" ON news_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );
