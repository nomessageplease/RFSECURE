-- Создание таблиц для форума

-- Таблица категорий форума
CREATE TABLE IF NOT EXISTS forum_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(20) DEFAULT 'blue',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица тем/обсуждений
CREATE TABLE IF NOT EXISTS forum_topics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES forum_categories(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  author_name VARCHAR(255) NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  is_hot BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'pending', 'archived', 'deleted')),
  views INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  last_reply_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_reply_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  last_reply_author VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица сообщений в темах
CREATE TABLE IF NOT EXISTS forum_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id UUID REFERENCES forum_topics(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  author_name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_edited BOOLEAN DEFAULT false,
  edited_at TIMESTAMP WITH TIME ZONE,
  edited_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'pending', 'deleted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для оптимизации
CREATE INDEX IF NOT EXISTS idx_forum_topics_category_id ON forum_topics(category_id);
CREATE INDEX IF NOT EXISTS idx_forum_topics_author_id ON forum_topics(author_id);
CREATE INDEX IF NOT EXISTS idx_forum_topics_status ON forum_topics(status);
CREATE INDEX IF NOT EXISTS idx_forum_topics_created_at ON forum_topics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_posts_topic_id ON forum_posts(topic_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_author_id ON forum_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_created_at ON forum_posts(created_at);

-- Функция для обновления счетчиков тем
CREATE OR REPLACE FUNCTION update_topic_counters()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Увеличиваем счетчик ответов и обновляем информацию о последнем сообщении
    UPDATE forum_topics 
    SET 
      replies_count = replies_count + 1,
      last_reply_at = NEW.created_at,
      last_reply_by = NEW.author_id,
      last_reply_author = NEW.author_name,
      updated_at = NOW()
    WHERE id = NEW.topic_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Уменьшаем счетчик ответов
    UPDATE forum_topics 
    SET 
      replies_count = GREATEST(0, replies_count - 1),
      updated_at = NOW()
    WHERE id = OLD.topic_id;
    
    -- Обновляем информацию о последнем сообщении
    UPDATE forum_topics 
    SET 
      last_reply_at = COALESCE(
        (SELECT created_at FROM forum_posts 
         WHERE topic_id = OLD.topic_id AND status = 'active' 
         ORDER BY created_at DESC LIMIT 1),
        created_at
      ),
      last_reply_by = COALESCE(
        (SELECT author_id FROM forum_posts 
         WHERE topic_id = OLD.topic_id AND status = 'active' 
         ORDER BY created_at DESC LIMIT 1),
        author_id
      ),
      last_reply_author = COALESCE(
        (SELECT author_name FROM forum_posts 
         WHERE topic_id = OLD.topic_id AND status = 'active' 
         ORDER BY created_at DESC LIMIT 1),
        author_name
      )
    WHERE id = OLD.topic_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Триггер для автоматического обновления счетчиков
DROP TRIGGER IF EXISTS trigger_update_topic_counters ON forum_posts;
CREATE TRIGGER trigger_update_topic_counters
  AFTER INSERT OR DELETE ON forum_posts
  FOR EACH ROW EXECUTE FUNCTION update_topic_counters();

-- Функция для обновления счетчика просмотров
CREATE OR REPLACE FUNCTION increment_topic_views(topic_uuid UUID)
RETURNS void AS $$
BEGIN
  UPDATE forum_topics 
  SET views = views + 1, updated_at = NOW()
  WHERE id = topic_uuid;
END;
$$ LANGUAGE plpgsql;

-- RLS политики
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

-- Политики для категорий (все могут читать, только админы могут изменять)
CREATE POLICY "Все могут просматривать категории" ON forum_categories
  FOR SELECT USING (true);

CREATE POLICY "Только админы могут управлять категориями" ON forum_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'moderator')
    )
  );

-- Политики для тем
CREATE POLICY "Все могут просматривать активные темы" ON forum_topics
  FOR SELECT USING (status = 'active' OR status = 'pending');

CREATE POLICY "Авторизованные пользователи могут создавать темы" ON forum_topics
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND author_id = auth.uid());

CREATE POLICY "Авторы могут редактировать свои темы" ON forum_topics
  FOR UPDATE USING (author_id = auth.uid());

CREATE POLICY "Модераторы могут управлять всеми темами" ON forum_topics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'moderator')
    )
  );

-- Политики для сообщений
CREATE POLICY "Все могут просматривать активные сообщения" ON forum_posts
  FOR SELECT USING (status = 'active' OR status = 'pending');

CREATE POLICY "Авторизованные пользователи могут создавать сообщения" ON forum_posts
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND author_id = auth.uid());

CREATE POLICY "Авторы могут редактировать свои сообщения" ON forum_posts
  FOR UPDATE USING (author_id = auth.uid());

CREATE POLICY "Модераторы могут управлять всеми сообщениями" ON forum_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'moderator')
    )
  );
