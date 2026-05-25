const STATUSES = {
  '/принят':    { emoji: '✅', text: 'Принят',    msg: 'Ваш заказ принят! Скоро свяжемся для подтверждения.' },
  '/в_пути':    { emoji: '🚚', text: 'В пути',    msg: 'Ваш заказ в пути! Ожидайте курьера сегодня.' },
  '/доставлен': { emoji: '🎉', text: 'Доставлен', msg: 'Заказ доставлен! Спасибо что выбрали AquaDom 💧' },
  '/отменён':   { emoji: '❌', text: 'Отменён',   msg: 'К сожалению ваш заказ отменён. Свяжитесь с нами.' },
}

async function sendTelegram(chatId, text) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' })
  })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const message = body?.message
    if (!message) return Response.json({ ok: true })

    const text = message?.text || ''
    const chatId = message?.chat?.id

    if (text === '/start' || text === '/help') {
      await sendTelegram(chatId, `💧 *AquaDom — Управление заказами*\n\nКоманды:\n\`/принят 314585\`\n\`/в_пути 314585\`\n\`/доставлен 314585\`\n\`/отменён 314585\``)
      return Response.json({ ok: true })
    }

    const parts = text.trim().split(' ')
    const cmd = parts[0]
    const orderNum = parts[1]

    if (STATUSES[cmd]) {
      if (!orderNum) {
        await sendTelegram(chatId, `⚠️ Укажи номер заказа. Пример: \`${cmd} 314585\``)
        return Response.json({ ok: true })
      }
      const status = STATUSES[cmd]
      await sendTelegram(chatId, `${status.emoji} Заказ *#${orderNum}* → *${status.text}*`)
      return Response.json({ ok: true })
    }

    return Response.json({ ok: true })
  } catch (error) {
    return Response.json({ ok: true })
  }
}
