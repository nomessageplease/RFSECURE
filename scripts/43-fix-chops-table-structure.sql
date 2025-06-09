-- Проверяем и исправляем структуру таблицы chops
-- Добавляем недостающие поля если их нет

-- Добавляем поле inn если его нет
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'chops' AND column_name = 'inn') THEN
        ALTER TABLE chops ADD COLUMN inn VARCHAR(12);
    END IF;
END $$;

-- Добавляем поле website если его нет
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'chops' AND column_name = 'website') THEN
        ALTER TABLE chops ADD COLUMN website TEXT;
    END IF;
END $$;

-- Проверяем существующие поля и их типы
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'chops' 
ORDER BY ordinal_position;
