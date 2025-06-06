-- Проверяем существующие данные
SELECT 'profiles' as table_name, COUNT(*) as row_count FROM public.profiles
UNION ALL
SELECT 'jobs' as table_name, COUNT(*) as row_count FROM public.jobs
UNION ALL
SELECT 'job_applications' as table_name, COUNT(*) as row_count FROM public.job_applications;
