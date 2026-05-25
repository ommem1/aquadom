async function sendTelegram(chatId, text) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'Markdown' })
  })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const message = body && body.message
    if (!message) return Response.json({ ok: true })

    const text = message.text || ''
    const chatId = message.chat && message.chat.id
    const chatType = message.chat && message.chat.type
    const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID

    if (chatType === 'private') {
      if (text === '/start') {
        await sendTelegram(chatId, 'AquaDom\n\nЗдесь вы будете получать уведомления о статусе вашего заказа.\n\nДля заказа: aquadom.uz')
      }
      return Response.json({ ok: true })
    }

    if (String(chatId) !== String(ADMIN_CHAT_ID)) {
      return Response.json({ ok: true })
    }

    const parts = text.trim().split(' ')
    const cmd = parts[0]
    const orderNum = parts[1]

    const statuses = {
      '/принят': 'Принят',
      '/в_пути': 'В пути',
      '/доставлен': 'Доставлен',
      '/отменён': 'Отменён'
    }

    if (text === '/help') {
      await sendTelegram(chatId, 'AquaDom - Управление заказами\n\n/принят НОМЕР\n/в_пути НОМЕР\n/доставлен НОМЕР\n/отменён НОМЕР')
      return Response.json({ ok: true })
    }

    if (statuses[cmd]) {
      if (!orderNum) {
        await sendTelegram(chatId, 'Укажи номер заказа. Пример: ' + cmd + ' 314585')
        return Response.json({ ok: true })
      }
      await sendTelegram(chatId, 'Заказ #' + orderNum + ' -> ' + statuses[cmd])
      return Response.json({ ok: true })
    }

    return Response.json({ ok: true })
  } catch (error) {
    return Response.json({ ok: true })
  }
}
