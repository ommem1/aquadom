export async function POST(request) {
  try {
    const body = await request.json()
    const { name, phone, city, address, size, price, freq, dur, deliveries, total, telegram } = body

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID
    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

    if (!BOT_TOKEN || !ADMIN_CHAT_ID) {
      return Response.json({ error: 'Telegram не настроен' }, { status: 500 })
    }

    const orderNum = Date.now().toString().slice(-6)
    const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })

    // Сохраняем заказ в Supabase
    if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_SERVICE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
          },
          body: JSON.stringify({
            order_num: orderNum,
            name, phone, city, address,
            size, freq, dur, deliveries: parseInt(deliveries),
            total, telegram: telegram || null,
            status: 'new',
            created_at: new Date().toISOString()
          })
        })
      } catch (e) {
        console.error('Supabase error:', e)
      }
    }

    // Сообщение для группы
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

─────────────────
Команды статуса:
/принят ${orderNum}
/в_пути ${orderNum}
/доставлен ${orderNum}
    `.trim()

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: ADMIN_CHAT_ID,
        text: adminMsg,
      })
    })

    // Подтверждение клиенту
    if (telegram && telegram.startsWith('@')) {
      try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegram,
            text: `💧 *AquaDom — заказ принят!*\n\nЗдравствуйте, ${name}!\nВаш заказ *#${orderNum}* получен.\n\n📦 ${size} л · ${freq}\n📍 ${city}, ${address}\n\nМы свяжемся с вами в течение часа. Спасибо! 🏠`,
            parse_mode: 'Markdown'
          })
        })
      } catch (e) {}
    }

    return Response.json({ success: true, orderNum })
  } catch (error) {
    console.error('Order error:', error)
    return Response.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
