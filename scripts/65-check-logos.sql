-- Проверяем логотипы ЧОПов
SELECT 
  id,
  name,
  inn,
  logo_url,
  CASE 
    WHEN logo_url IS NOT NULL THEN 'Есть логотип'
    ELSE 'Нет логотипа'
  END as logo_status,
  created_at
FROM chops 
ORDER BY created_at DESC;

-- Проверяем конкретно ваш ЧОП
SELECT 
  id,
  name,
  inn,
  logo_url,
  LENGTH(logo_url) as url_length,
  created_by,
  created_at
FROM chops 
WHERE created_by IS NOT NULL
ORDER BY created_at DESC
LIMIT 5;
