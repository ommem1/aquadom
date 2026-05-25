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
    const chatType = message?.chat?.type
    const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID

    // Личное сообщение клиенту — только приветствие
    if (chatType === 'private') {
      if (text === '/start') {
        await sendTelegram(chatId, `💧 *AquaDom*\n\nЗдесь вы будете получать уведомления о статусе вашего заказа.\n\nДля заказа воды: [aquadom.uz](https://aquadom.uz)\n\nЕсть вопросы? Напишите нам @aquadomm_bot`)
      }
      return Response.json({ ok: true })
    }

    // Групповые команды — только для админ группы
    if (String(chatId) !== String(ADMIN_CHAT_ID)) {
      return Response.json({ ok: true })
    }

    if (text === '/help') {
      await sendTelegram(chatId, `💧 *AquaDom — Управление заказами*\n\nКоманды:\n\`/принят НОМЕР\`\n\`/в_пути НОМЕР\`\n\`/доставлен НОМЕР\`\n\`/отменён НОМЕР\``)
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
}        await sendTelegram(chatId, `⚠️ Укажи номер заказа. Пример: \`${cmd} 314585\``)
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
