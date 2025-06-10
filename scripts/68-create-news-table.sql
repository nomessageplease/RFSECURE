-- Создание таблицы новостей
CREATE TABLE IF NOT EXISTS public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general',
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    image_url TEXT,
    tags TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    featured BOOLEAN DEFAULT FALSE,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание индексов
CREATE INDEX IF NOT EXISTS idx_news_status ON public.news(status);
CREATE INDEX IF NOT EXISTS idx_news_category ON public.news(category);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news(published_at);
CREATE INDEX IF NOT EXISTS idx_news_featured ON public.news(featured);
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news(slug);

-- Включение RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Политики RLS
-- Все могут читать опубликованные новости
CREATE POLICY "Anyone can read published news" ON public.news
    FOR SELECT USING (status = 'published');

-- Админы и модераторы могут читать все новости
CREATE POLICY "Admins and moderators can read all news" ON public.news
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'moderator')
        )
    );

-- Только админы могут создавать новости
CREATE POLICY "Only admins can create news" ON public.news
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Только админы могут обновлять новости
CREATE POLICY "Only admins can update news" ON public.news
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Только админы могут удалять новости
CREATE POLICY "Only admins can delete news" ON public.news
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Функция для обновления updated_at
CREATE OR REPLACE FUNCTION update_news_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер для автоматического обновления updated_at
CREATE TRIGGER update_news_updated_at_trigger
    BEFORE UPDATE ON public.news
    FOR EACH ROW
    EXECUTE FUNCTION update_news_updated_at();
