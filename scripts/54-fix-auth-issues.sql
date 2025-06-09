-- Проверяем настройки аутентификации
SELECT * FROM auth.config;

-- Увеличиваем время жизни сессии до 30 дней
UPDATE auth.config
SET 
  site_url = 'http://localhost:3000',
  additional_redirect_urls = ARRAY['https://*.vercel.app', 'http://localhost:*'],
  jwt_expiry = 604800, -- 7 дней
  refresh_token_rotation_enabled = true,
  refresh_token_expiry = 2592000; -- 30 дней

-- Проверяем активные сессии
SELECT 
  id,
  user_id,
  created_at,
  updated_at,
  factor_id,
  aal,
  not_after
FROM auth.sessions
ORDER BY created_at DESC
LIMIT 10;

-- Проверяем настройки после обновления
SELECT * FROM auth.config;
