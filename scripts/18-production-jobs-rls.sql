-- Настраиваем RLS для таблицы jobs
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Удаляем старые политики если есть
DROP POLICY IF EXISTS "jobs_select_policy" ON public.jobs;
DROP POLICY IF EXISTS "jobs_insert_policy" ON public.jobs;
DROP POLICY IF EXISTS "jobs_update_policy" ON public.jobs;
DROP POLICY IF EXISTS "jobs_delete_policy" ON public.jobs;

-- 1. ПРОСМОТР: Все могут видеть активные вакансии
CREATE POLICY "jobs_select_policy" 
ON public.jobs FOR SELECT 
USING (
  status = 'active' OR 
  auth.uid() = employer_id OR
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'moderator')
  )
);

-- 2. СОЗДАНИЕ: Только верифицированные ЧОПы могут создавать вакансии
CREATE POLICY "jobs_insert_policy" 
ON public.jobs FOR INSERT 
WITH CHECK (
  auth.uid() = employer_id AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'chop' 
    AND is_verified = true
  )
);

-- 3. ОБНОВЛЕНИЕ: Только автор вакансии или админы
CREATE POLICY "jobs_update_policy" 
ON public.jobs FOR UPDATE 
USING (
  auth.uid() = employer_id OR
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'moderator')
  )
)
WITH CHECK (
  auth.uid() = employer_id OR
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'moderator')
  )
);

-- 4. УДАЛЕНИЕ: Только автор или админы
CREATE POLICY "jobs_delete_policy" 
ON public.jobs FOR DELETE 
USING (
  auth.uid() = employer_id OR
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'moderator')
  )
);
