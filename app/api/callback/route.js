export async function POST(request) {
  try {
    const body = await request.json()
    const { name, phone, message, product } = body

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID

    if (!BOT_TOKEN || !ADMIN_CHAT_ID) {
      return Response.json({ error: 'Telegram не настроен' }, { status: 500 })
    }

    const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' })

    const text = [
      '📞 ЗАЯВКА НА ОБРАТНЫЙ ЗВОНОК',
      '',
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      product ? `Товар: ${product}` : null,
      message ? `Сообщение: ${message}` : null,
      '',
      now,
    ].filter(l => l !== null).join('\n')

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text }),
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Callback error:', error)
    return Response.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
