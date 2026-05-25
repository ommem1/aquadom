# AquaDom — aquadom.uz

Сайт доставки дистиллированной воды по Узбекистану.

## Деплой на Vercel

### 1. Переменные окружения
В Vercel добавь:
- `TELEGRAM_BOT_TOKEN` — токен от @BotFather
- `TELEGRAM_ADMIN_CHAT_ID` — chat_id администратора

### 2. Как узнать свой TELEGRAM_ADMIN_CHAT_ID
1. Напиши боту @userinfobot в Telegram
2. Он ответит твоим chat_id
3. Скопируй и вставь в Vercel

### 3. Подключение домена
В Vercel → Project Settings → Domains → добавь aquadom.uz

## Стек
- Next.js 14
- Vercel (хостинг + serverless функции)
- Telegram Bot API (уведомления)
