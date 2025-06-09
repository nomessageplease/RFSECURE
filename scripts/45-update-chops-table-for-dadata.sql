-- Добавляем новые поля для данных из DaData
ALTER TABLE IF EXISTS chops
ADD COLUMN IF NOT EXISTS ogrn TEXT,
ADD COLUMN IF NOT EXISTS manager TEXT,
ADD COLUMN IF NOT EXISTS registration_date TEXT,
ADD COLUMN IF NOT EXISTS okved TEXT;

-- Создаем уникальный индекс по ИНН для предотвращения дублирования
CREATE UNIQUE INDEX IF NOT EXISTS chops_inn_unique_idx ON chops (inn);

-- Проверяем структуру таблицы
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'chops';
