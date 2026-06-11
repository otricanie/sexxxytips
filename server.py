#!/usr/bin/env python3
"""SEXY TIPS — статика + приём заказов + уведомления в Telegram.

Запуск:  python3 server.py  →  http://localhost:8000
Заказы с сайта пишутся в orders.json рядом с этим файлом.

Telegram-уведомления:
1. Создай бота у @BotFather (/newbot) и скопируй токен.
2. Вставь токен в tg_config.json (поле "token").
3. Напиши своему боту /start — со следующего заказа уведомления
   начнут приходить тебе в этот чат (chat_id определится сам по нику).
"""
import json
import os
import threading
import urllib.parse
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))
ORDERS = os.path.join(ROOT, 'orders.json')
TG_CONFIG = os.path.join(ROOT, 'tg_config.json')
LOCK = threading.Lock()


# ---------- telegram ----------
def tg_load():
    try:
        with open(TG_CONFIG, encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def tg_save(cfg):
    with open(TG_CONFIG, 'w', encoding='utf-8') as f:
        json.dump(cfg, f, ensure_ascii=False, indent=2)


def tg_api(token, method, params):
    url = f'https://api.telegram.org/bot{token}/{method}'
    data = urllib.parse.urlencode(params).encode()
    with urllib.request.urlopen(url, data=data, timeout=15) as r:
        return json.loads(r.read())


def tg_chats(cfg):
    """chat_id только для ников из белого списка cfg['allowed'].

    Неизвестные chat_id ищем в getUpdates: бот запоминает чат, только если
    ник пользователя есть в списке. Все остальные игнорируются.
    """
    allowed = [a.lstrip('@').lower() for a in cfg.get('allowed', [])]
    chats = cfg.get('chats', {})
    missing = [a for a in allowed if a not in chats]
    if missing:
        try:
            upd = tg_api(cfg['token'], 'getUpdates', {})
            for u in upd.get('result', []):
                chat = (u.get('message') or {}).get('chat') or {}
                uname = (chat.get('username') or '').lower()
                if chat.get('type') == 'private' and uname in allowed:
                    chats[uname] = chat['id']
            cfg['chats'] = chats
            tg_save(cfg)
        except Exception as e:
            print('tg: не удалось получить chat_id:', e)
    return [chats[a] for a in allowed if a in chats]


def order_text(o):
    c = o.get('customer', {})
    lines = [f"🛒 НОВЫЙ ЗАКАЗ № {o.get('num', '?')}", '']
    for i in o.get('items', []):
        lines.append(f"• {i.get('name')} — размер {i.get('size')} × {i.get('qty')} = {(i.get('price') or 0) * i.get('qty', 1)}₽")
    lines += [
        f"ИТОГО: {o.get('total', '?')}₽",
        '',
        f"Клиент: {c.get('name', '')} {c.get('surname', '')}".strip(),
        f"Телефон: {c.get('phone', '—')}",
        f"Telegram: {c.get('telegram') or '—'}",
        f"Получение: {c.get('delivery', '—')}",
    ]
    if c.get('address'):
        lines.append(f"Адрес: {c['address']}")
    return '\n'.join(lines)


def tg_notify(order):
    cfg = tg_load()
    token = cfg.get('token', '')
    if not token or token.startswith('ВСТАВЬ'):
        print('tg: токен не настроен (tg_config.json) — уведомление не отправлено')
        return
    chat_ids = tg_chats(cfg)
    if not chat_ids:
        print('tg: ни один разрешённый ник ещё не написал боту /start — уведомление не отправлено')
        return
    for cid in chat_ids:
        try:
            tg_api(token, 'sendMessage', {'chat_id': cid, 'text': order_text(order)})
            print(f"tg: уведомление о заказе {order.get('num', '?')} отправлено в чат {cid}")
        except Exception as e:
            print('tg: ошибка отправки:', e)


# ---------- http ----------
PRIVATE = ('/tg_config.json', '/orders.json', '/server.py', '/DEPLOY.md', '/README.md', '/CLAUDE.md')


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        clean = self.path.split('?')[0].rstrip('/')
        if clean in PRIVATE or clean.startswith('/deploy'):
            self.send_error(404)
            return
        super().do_GET()

    def end_headers(self):
        # html/css/js всегда свежие — браузер не залипает на старой версии
        if self.path.split('?')[0].endswith(('.html', '.css', '.js', '/')):
            self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def do_POST(self):
        if self.path.split('?')[0].rstrip('/') not in ('/api/order', '/api/order.php'):
            self.send_error(404)
            return
        try:
            length = int(self.headers.get('Content-Length', 0))
            order = json.loads(self.rfile.read(length))
        except (ValueError, json.JSONDecodeError):
            self.send_error(400)
            return
        with LOCK:
            try:
                with open(ORDERS, encoding='utf-8') as f:
                    all_orders = json.load(f)
            except (FileNotFoundError, json.JSONDecodeError):
                all_orders = []
            all_orders.append(order)
            with open(ORDERS, 'w', encoding='utf-8') as f:
                json.dump(all_orders, f, ensure_ascii=False, indent=2)
        num = order.get('num', '?')
        phone = order.get('customer', {}).get('phone', '?')
        print(f'+ заказ {num} — {phone}')
        threading.Thread(target=tg_notify, args=(order,), daemon=True).start()
        self.send_response(204)
        self.end_headers()

    def log_message(self, fmt, *args):
        pass  # тихий статик-лог


if __name__ == '__main__':
    import sys
    os.chdir(ROOT)
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    try:
        srv = ThreadingHTTPServer(('0.0.0.0', port), Handler)
    except OSError:
        print(f'Порт {port} уже занят. Закрой старый сервер (Ctrl+C в его окне)')
        print(f'или запусти на другом порту:  python3 server.py {port + 1}')
        raise SystemExit(1)
    cfg = tg_load()
    tg_state = 'настроен' if cfg.get('token') and not cfg['token'].startswith('ВСТАВЬ') else 'НЕ настроен (см. tg_config.json)'
    print(f'SEXY TIPS на http://localhost:{port} — заказы в orders.json, telegram: {tg_state}')
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print('\nостановлено')
