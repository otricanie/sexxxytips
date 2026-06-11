#!/bin/bash
# SEXY TIPS — установка на чистый Ubuntu 24.04 (Timeweb VPS), сайт берётся с GitHub.
# Запуск на сервере:
#   curl -sL https://raw.githubusercontent.com/otricanie/sexxxytips/main/install.sh -o i.sh
#   bash i.sh                       # сайт без телеграм-уведомлений
#   bash i.sh <ТОКЕН_БОТА>          # сайт + телеграм-уведомления
set -e
TOKEN="${1:-}"
export DEBIAN_FRONTEND=noninteractive
REPO="https://codeload.github.com/otricanie/sexxxytips/zip/refs/heads/main"

echo "[1/6] пакеты (caddy, unzip)..."
apt-get update -y -qq
apt-get install -y -qq caddy unzip curl >/dev/null

echo "[2/6] скачиваю сайт с GitHub..."
curl -sL "$REPO" -o /tmp/site.zip
rm -rf /tmp/site && unzip -o -q /tmp/site.zip -d /tmp/site
mkdir -p /opt/sexytips
cp -rf /tmp/site/sexxxytips-main/. /opt/sexytips/
rm -rf /tmp/site /tmp/site.zip

echo "[3/6] заказы и телеграм..."
[ -f /opt/sexytips/orders.json ] || echo '[]' > /opt/sexytips/orders.json
if [ -n "$TOKEN" ]; then
  cat > /opt/sexytips/tg_config.json <<EOF
{
  "token": "$TOKEN",
  "allowed": ["@god_kitty", "@velsenpai"],
  "chats": { "god_kitty": 401966925 }
}
EOF
  echo "    телеграм-уведомления включены"
else
  echo "    без телеграма (запусти с токеном, чтобы включить)"
fi
chown -R www-data:www-data /opt/sexytips

echo "[4/6] служба заказов..."
cp /opt/sexytips/deploy/sexytips.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now sexytips
systemctl restart sexytips

echo "[5/6] веб-сервер (порт 80)..."
printf ':80 {\n  reverse_proxy localhost:8000\n  encode gzip\n}\n' > /etc/caddy/Caddyfile
systemctl restart caddy

echo "[6/6] проверка..."
sleep 2
code=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:8000/catalog.html || echo fail)
echo "    каталог отвечает: $code (ожидается 200)"
systemctl is-active sexytips caddy
echo ""
echo "=== DEPLOY OK — открой в браузере: http://89.169.3.14 ==="
