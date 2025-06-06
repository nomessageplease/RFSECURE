-- Тестируем настройки

-- Проверяем RLS
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'profiles';

-- Проверяем политики
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'profiles';

-- Проверяем триггер
SELECT trigger_name FROM information_schema.triggers WHERE event_object_table = 'users';

-- Проверяем функцию
SELECT routine_name FROM information_schema.routines WHERE routine_name = 'handle_new_user';
