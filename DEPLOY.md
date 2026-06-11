# Деплой SEXY TIPS на VPS (Timeweb Cloud, Ubuntu 24.04)

Перед началом: куплен сервер (есть IP и пароль root), A-записи домена
(`@` и `www`) указывают на IP сервера.

Везде ниже замени `IP_СЕРВЕРА` на свой IP, `ТВОЙ-ДОМЕН.ru` — на свой домен.

## 1. Залить сайт на сервер (выполняется НА МАКЕ)

```bash
cd ~/Desktop
rsync -av --exclude '.DS_Store' "сайт секси типс/" root@IP_СЕРВЕРА:/opt/sexytips/
```

(спросит пароль root; повторять эту же команду при любом обновлении сайта)

## 2. Установить всё нужное (выполняется НА СЕРВЕРЕ, ssh root@IP_СЕРВЕРА)

```bash
apt update && apt install -y caddy rsync
```

## 3. Включить сервер заказов как службу

```bash
cp /opt/sexytips/deploy/sexytips.service /etc/systemd/system/
chown -R www-data:www-data /opt/sexytips
systemctl daemon-reload
systemctl enable --now sexytips
systemctl status sexytips --no-pager   # должно быть active (running)
```

## 4. Настроить домен и HTTPS (Caddy)

```bash
nano /opt/sexytips/deploy/Caddyfile   # замени ТВОЙ-ДОМЕН.ru на свой домен (2 места)
cp /opt/sexytips/deploy/Caddyfile /etc/caddy/Caddyfile
systemctl reload caddy
```

Через ~1 минуту сайт доступен по `https://ТВОЙ-ДОМЕН.ru` с зелёным замком.

## 5. Проверить

- открой сайт с телефона (не из домашней сети) — каталог, корзина;
- оформи тестовый заказ — должно прийти сообщение от бота в Telegram;
- заказы копятся в `/opt/sexytips/orders.json`.

## Обновление сайта после правок

На маке: снова команда из шага 1 (rsync), затем на сервере:

```bash
systemctl restart sexytips
```

## Полезное

```bash
journalctl -u sexytips -f          # живой лог заказов
cat /opt/sexytips/orders.json      # все заказы
systemctl restart sexytips         # перезапуск после обновления файлов
```

## Безопасность (рекомендуется, 2 минуты)

```bash
ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw enable
```

`tg_config.json` (токен бота), `orders.json` (данные клиентов), `server.py`
и папка `deploy/` наружу не раздаются — сервер отвечает на них 404.
