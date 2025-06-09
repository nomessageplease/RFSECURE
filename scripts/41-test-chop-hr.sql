-- Тестируем создание профиля с ролью chop_hr
INSERT INTO profiles (id, email, full_name, role) 
VALUES (
  gen_random_uuid(),
  'test-hr@example.com',
  'Тест HR',
  'chop_hr'
);

-- Проверяем результат
SELECT * FROM profiles WHERE role = 'chop_hr';
