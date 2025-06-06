-- Проверяем все вакансии в системе
SELECT 
    j.title,
    j.company_name,
    j.location,
    j.salary_from,
    j.salary_to,
    j.status,
    j.is_urgent,
    j.views,
    j.applications,
    j.created_at
FROM jobs j
ORDER BY j.created_at DESC;

-- Статистика по статусам вакансий
SELECT 
    status,
    COUNT(*) as count
FROM jobs
GROUP BY status;

-- Статистика по компаниям
SELECT 
    company_name,
    COUNT(*) as jobs_count,
    AVG(salary_from) as avg_salary_from,
    AVG(salary_to) as avg_salary_to
FROM jobs
GROUP BY company_name
ORDER BY jobs_count DESC;

-- Статистика по городам
SELECT 
    location,
    COUNT(*) as jobs_count
FROM jobs
GROUP BY location
ORDER BY jobs_count DESC;
