-- Сначала посмотрим все ЧОПы
SELECT 
  id,
  inn,
  name,
  website,
  created_by,
  created_at,
  CASE 
    WHEN created_by IS NULL THEN 'Тестовые данные'
    ELSE 'Создан пользователем'
  END as source
FROM chops 
ORDER BY created_at DESC;

-- Удаляем все тестовые ЧОПы (те, которые были созданы без пользователя или с тестовыми данными)
DELETE FROM chops 
WHERE created_by IS NULL 
   OR name IN (
     'Охранное Агентство Авангард',
     'Охранное Предприятие Барс', 
     'Агентство Комплексной Безопасности АКБ',
     'Тестовый ЧОП 1',
     'Тестовый ЧОП 2',
     'Тестовый ЧОП 3'
   )
   OR inn IN ('1234567890', '0987654321', '1111111111', '2222222222');

-- Проверяем, что осталось
SELECT 
  id,
  inn,
  name,
  website,
  created_by,
  created_at
FROM chops 
ORDER BY created_at DESC;

-- Показываем количество оставшихся ЧОПов
SELECT COUNT(*) as remaining_chops FROM chops;
