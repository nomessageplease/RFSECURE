-- Добавление тестовых данных для форума
INSERT INTO forum_categories (name, description, icon, color, sort_order) VALUES
('Общие вопросы', 'Общие вопросы о работе охранных компаний', 'Shield', 'bg-blue-100 text-blue-700', 1),
('Отзывы и рекомендации', 'Делитесь опытом работы с охранными компаниями', 'ThumbsUp', 'bg-green-100 text-green-700', 2),
('Правовые вопросы', 'Юридические аспекты охранной деятельности', 'Filter', 'bg-purple-100 text-purple-700', 3),
('Технические средства', 'Обсуждение охранного оборудования и технологий', 'Bell', 'bg-orange-100 text-orange-700', 4)
ON CONFLICT DO NOTHING;

-- Добавление тестовых тем (только если есть пользователи)
DO $$
DECLARE
  admin_user_id UUID;
  category_general INTEGER;
  category_reviews INTEGER;
BEGIN
  -- Находим админа
  SELECT id INTO admin_user_id FROM auth.users WHERE email = 'admin@chopy.ru' LIMIT 1;
  
  -- Находим категории
  SELECT id INTO category_general FROM forum_categories WHERE name = 'Общие вопросы' LIMIT 1;
  SELECT id INTO category_reviews FROM forum_categories WHERE name = 'Отзывы и рекомендации' LIMIT 1;
  
  -- Если есть админ и категории, добавляем темы
  IF admin_user_id IS NOT NULL AND category_general IS NOT NULL THEN
    INSERT INTO forum_topics (category_id, title, content, author_id, author_name, is_pinned, views_count, replies_count) VALUES
    (category_general, 'Добро пожаловать на форум!', 'Это первая тема на нашем форуме. Здесь вы можете обсуждать вопросы безопасности.', admin_user_id, 'Администратор', true, 150, 5),
    (category_general, 'Правила форума', 'Ознакомьтесь с правилами поведения на форуме.', admin_user_id, 'Администратор', true, 89, 2);
    
    IF category_reviews IS NOT NULL THEN
      INSERT INTO forum_topics (category_id, title, content, author_id, author_name, views_count, replies_count) VALUES
      (category_reviews, 'Как оставить отзыв о ЧОП', 'Инструкция по оставлению отзывов о частных охранных предприятиях.', admin_user_id, 'Администратор', 67, 8);
    END IF;
  END IF;
END $$;
