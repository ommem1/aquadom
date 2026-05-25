export async function POST(request) {
  try {
    const body = await request.json()
    const { name, phone, city, address, size, price, freq, dur, deliveries, total, telegram } = body

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID

    if (!BOT_TOKEN || !ADMIN_CHAT_ID) {
      return Response.json({ error: 'Telegram не настроен' }, { status: 500 })
    }

    const orderNum = Date.now().toString().slice(-6)
    const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })

    // Сообщение для администратора
    const adminMsg = `
🆕 *НОВЫЙ ЗАКАЗ #${orderNum}*

👤 *Клиент:* ${name}
📞 *Телефон:* ${phone}
📍 *Город:* ${city}
🏠 *Адрес:* ${address}
${telegram ? `📱 *Telegram:* ${telegram}` : ''}

💧 *Объём:* ${size} л
🔄 *Частота:* ${freq}
📅 *Срок:* ${dur}
📦 *Доставок:* ${deliveries}
💰 *Итого:* ${total}

⏰ ${now}
    `.trim()

    // Отправляем администратору
    const adminRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text: adminMsg,
        parse_mode: 'Markdown'
      })
    })

    // Сообщение клиенту (если указал Telegram)
    if (telegram && telegram.startsWith('@')) {
      const clientMsg = `
💧 *AquaDom — заказ принят!*

Здравствуйте, ${name}! Ваш заказ *#${orderNum}* получен.

📦 ${size} л · ${freq}
📍 ${city}, ${address}

Мы свяжемся с вами в течение часа для подтверждения.

Спасибо, что выбрали AquaDom! 🏠
      `.trim()

      try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegram,
            text: clientMsg,
            parse_mode: 'Markdown'
          })
        })
      } catch (e) {
        // Клиент мог не запустить бота — не критично
      }
    }

    return Response.json({ success: true, orderNum })
  } catch (error) {
    console.error('Order error:', error)
    return Response.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
