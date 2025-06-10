-- Добавление тестовых данных для форума

-- Добавляем категории форума
INSERT INTO forum_categories (name, description, icon, color, sort_order) VALUES
('Общие вопросы', 'Общие вопросы о работе охранных компаний', 'Shield', 'blue', 1),
('Отзывы и рекомендации', 'Делитесь опытом работы с охранными компаниями', 'ThumbsUp', 'green', 2),
('Правовые вопросы', 'Юридические аспекты охранной деятельности', 'Scale', 'purple', 3),
('Технические средства', 'Обсуждение охранного оборудования и технологий', 'Settings', 'orange', 4),
('Работа и карьера', 'Вопросы трудоустройства и карьерного роста', 'Briefcase', 'indigo', 5);

-- Получаем ID категорий для создания тем
DO $$
DECLARE
    cat_general UUID;
    cat_reviews UUID;
    cat_legal UUID;
    cat_tech UUID;
    cat_career UUID;
    admin_id UUID;
    user_id UUID;
BEGIN
    -- Получаем ID категорий
    SELECT id INTO cat_general FROM forum_categories WHERE name = 'Общие вопросы';
    SELECT id INTO cat_reviews FROM forum_categories WHERE name = 'Отзывы и рекомендации';
    SELECT id INTO cat_legal FROM forum_categories WHERE name = 'Правовые вопросы';
    SELECT id INTO cat_tech FROM forum_categories WHERE name = 'Технические средства';
    SELECT id INTO cat_career FROM forum_categories WHERE name = 'Работа и карьера';
    
    -- Получаем ID пользователей
    SELECT id INTO admin_id FROM profiles WHERE role = 'admin' LIMIT 1;
    SELECT id INTO user_id FROM profiles WHERE role = 'user' LIMIT 1;
    
    -- Если нет пользователей, создаем тестовых
    IF admin_id IS NULL THEN
        INSERT INTO profiles (id, email, full_name, role) 
        VALUES (gen_random_uuid(), 'admin@test.com', 'Администратор', 'admin')
        RETURNING id INTO admin_id;
    END IF;
    
    IF user_id IS NULL THEN
        INSERT INTO profiles (id, email, full_name, role) 
        VALUES (gen_random_uuid(), 'user@test.com', 'Тестовый пользователь', 'user')
        RETURNING id INTO user_id;
    END IF;
    
    -- Создаем тестовые темы
    INSERT INTO forum_topics (category_id, title, content, author_id, author_name, is_pinned, views) VALUES
    (cat_general, 'Рейтинг лучших охранных компаний Москвы 2024', 
     'Давайте обсудим, какие охранные компании в Москве показывают лучшие результаты в 2024 году. Поделитесь своим опытом!', 
     admin_id, 'Администратор', true, 1234),
    
    (cat_general, 'Как проверить лицензию охранной компании?', 
     'Подскажите, как правильно проверить действительность лицензии охранной компании? Какие документы должны быть?', 
     user_id, 'Тестовый пользователь', false, 567),
    
    (cat_reviews, 'Опыт работы с компанией "Альфа-Безопасность"', 
     'Хочу поделиться своим опытом сотрудничества с охранной компанией "Альфа-Безопасность". В целом остался доволен...', 
     user_id, 'Тестовый пользователь', false, 432),
    
    (cat_legal, 'Ответственность охранной компании за ущерб', 
     'Вопрос по юридической ответственности: если во время работы охранников произошел ущерб, кто несет ответственность?', 
     user_id, 'Тестовый пользователь', false, 289),
    
    (cat_tech, 'Новые системы видеонаблюдения 2024', 
     'Обсуждаем новинки в области систем видеонаблюдения. Какие технологии стоит внедрять в 2024 году?', 
     admin_id, 'Администратор', false, 156),
    
    (cat_career, 'Требования к охранникам в 2024 году', 
     'Какие требования предъявляют работодатели к охранникам? Какие курсы и сертификаты нужно получить?', 
     user_id, 'Тестовый пользователь', false, 345);
END $$;
