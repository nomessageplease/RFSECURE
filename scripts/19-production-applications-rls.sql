-- Создаем таблицу заявок на вакансии если не существует
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  applicant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Один пользователь может подать только одну заявку на вакансию
  UNIQUE(job_id, applicant_id)
);

-- Включаем RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Индексы для производительности
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON public.job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_applicant_id ON public.job_applications(applicant_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications(status);

-- 1. ПРОСМОТР: Соискатель видит свои заявки, работодатель - заявки на свои вакансии
CREATE POLICY "applications_select_policy" 
ON public.job_applications FOR SELECT 
USING (
  auth.uid() = applicant_id OR
  EXISTS (
    SELECT 1 FROM public.jobs 
    WHERE id = job_applications.job_id 
    AND employer_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'moderator')
  )
);

-- 2. СОЗДАНИЕ: Только охранники могут подавать заявки
CREATE POLICY "applications_insert_policy" 
ON public.job_applications FOR INSERT 
WITH CHECK (
  auth.uid() = applicant_id AND
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role = 'guard'
  )
);

-- 3. ОБНОВЛЕНИЕ: Работодатель может менять статус, соискатель - сообщение
CREATE POLICY "applications_update_policy" 
ON public.job_applications FOR UPDATE 
USING (
  auth.uid() = applicant_id OR
  EXISTS (
    SELECT 1 FROM public.jobs 
    WHERE id = job_applications.job_id 
    AND employer_id = auth.uid()
  ) OR
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'moderator')
  )
);

-- 4. УДАЛЕНИЕ: Только соискатель может удалить свою заявку
CREATE POLICY "applications_delete_policy" 
ON public.job_applications FOR DELETE 
USING (
  auth.uid() = applicant_id OR
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'moderator')
  )
);
