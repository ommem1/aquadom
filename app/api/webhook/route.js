const SITE_URL = 'https://aquadom.uz'
const PHONE = '+998 90 186 01 28'

async function sendTelegram(chatId, text, extra = {}) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', ...extra }),
  })
  return res.json()
}

async function supabaseQuery(url, key, method, path, body) {
  const res = await fetch(url + path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: 'Bearer ' + key,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  return res.json()
}

export async function POST(request) {
  try {
    const body = await request.json()
    const message = body?.message
    if (!message) return Response.json({ ok: true })

    const text = (message.text || '').trim()
    const chatId = message.chat?.id
    const chatType = message.chat?.type
    const from = message.from || {}
    const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID
    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY

    // ─── PERSONAL CHAT WITH CLIENT ───────────────────────────────────────────
    if (chatType === 'private') {

      // /start
      if (text === '/start') {
        await sendTelegram(chatId, [
          '💧 <b>Добро пожаловать в AquaDom!</b>',
          '',
          'Мы производим дистиллированную воду для техники.',
          'Собственное производство · ГОСТ · pH = 0',
          '',
          '<b>Чем могу помочь?</b>',
          '',
          '📦 <b>Узнать статус заказа</b>',
          'Отправьте 6-значный номер заказа из письма подтверждения.',
          '',
          '💬 <b>Написать менеджеру</b>',
          'Просто напишите ваш вопрос — ответим в рабочее время.',
          '',
          `🌐 Каталог и цены: ${SITE_URL}/catalog`,
          `📞 Телефон: ${PHONE}`,
        ].join('\n'))
        return Response.json({ ok: true })
      }

      // 6-digit order number — link Telegram ID to order
      if (/^\d{6}$/.test(text)) {
        const orderNum = text
        if (SUPABASE_URL && SUPABASE_KEY) {
          const orders = await supabaseQuery(
            SUPABASE_URL, SUPABASE_KEY, 'GET',
            `/rest/v1/orders?order_num=eq.${orderNum}&select=*`
          )
          if (orders?.length > 0) {
            await supabaseQuery(
              SUPABASE_URL, SUPABASE_KEY, 'PATCH',
              `/rest/v1/orders?order_num=eq.${orderNum}`,
              { telegram_id: String(chatId) }
            )
            const statusMap = {
              new: 'В обработке',
              принят: 'Принят',
              в_пути: 'В пути',
              доставлен: 'Доставлен',
              отменён: 'Отменён',
            }
            const status = statusMap[orders[0].status] || 'В обработке'
            await sendTelegram(chatId,
              `✅ Заказ <b>#${orderNum}</b> найден!\n\nСтатус: <b>${status}</b>\n\nВы получите уведомление при изменении статуса.`
            )
          } else {
            await sendTelegram(chatId,
              `❌ Заказ <b>#${orderNum}</b> не найден.\n\nПроверьте номер и попробуйте снова.`
            )
          }
        } else {
          await sendTelegram(chatId, 'Сервис отслеживания временно недоступен. Напишите вопрос — ответим лично.')
        }
        return Response.json({ ok: true })
      }

      // Any other message — forward to admin group
      const userName = [from.first_name, from.last_name].filter(Boolean).join(' ') || 'Без имени'
      const userHandle = from.username ? `@${from.username}` : 'нет username'

      await sendTelegram(ADMIN_CHAT_ID, [
        '💬 <b>Сообщение от клиента</b>',
        '',
        `👤 ${userName} (${userHandle})`,
        `🆔 ID: <code>${chatId}</code>`,
        '',
        `"${text}"`,
        '',
        `➡️ Ответить: /ответить ${chatId} ваш_текст`,
      ].join('\n'))

      await sendTelegram(chatId,
        '✅ Ваше сообщение получено! Менеджер ответит в ближайшее время.'
      )
      return Response.json({ ok: true })
    }

    // ─── ADMIN GROUP ─────────────────────────────────────────────────────────
    if (String(chatId) !== String(ADMIN_CHAT_ID)) {
      return Response.json({ ok: true })
    }

    // /ответить <chat_id> <text>
    if (text.startsWith('/ответить ')) {
      const parts = text.split(' ')
      const targetId = parts[1]
      const replyText = parts.slice(2).join(' ')
      if (targetId && replyText) {
        await sendTelegram(targetId, `💧 <b>AquaDom</b>\n\n${replyText}`)
        await sendTelegram(chatId, `✅ Сообщение отправлено пользователю ${targetId}`)
      } else {
        await sendTelegram(chatId, 'Формат: /ответить <ID> <текст>')
      }
      return Response.json({ ok: true })
    }

    // /help
    if (text === '/help') {
      await sendTelegram(chatId, [
        '📋 <b>Команды AquaDom</b>',
        '',
        '<b>Статусы заказов:</b>',
        '/принят НОМЕР — заказ принят',
        '/в_пути НОМЕР — курьер в пути',
        '/доставлен НОМЕР — доставлен',
        '/отменён НОМЕР — отменён',
        '',
        '<b>Чат с клиентом:</b>',
        '/ответить ID текст — написать клиенту',
        '(ID виден в пересланном сообщении)',
      ].join('\n'))
      return Response.json({ ok: true })
    }

    // Order status commands
    const statusMessages = {
      '/принят': 'Принят — мы свяжемся с вами в ближайшее время.',
      '/в_пути': 'В пути — курьер едет к вам! 🚚',
      '/доставлен': 'Доставлен — спасибо, что выбрали AquaDom! 💧',
      '/отменён': 'Отменён — свяжитесь с нами для уточнения.',
    }

    const parts = text.split(' ')
    const cmd = parts[0]
    const orderNum = parts[1]

    if (statusMessages[cmd] && orderNum) {
      await sendTelegram(chatId, `✅ Заказ #${orderNum} → ${cmd.replace('/', '')}`)

      if (SUPABASE_URL && SUPABASE_KEY) {
        const statusKey = cmd.replace('/', '')
        await supabaseQuery(
          SUPABASE_URL, SUPABASE_KEY, 'PATCH',
          `/rest/v1/orders?order_num=eq.${orderNum}`,
          { status: statusKey }
        )
        const orders = await supabaseQuery(
          SUPABASE_URL, SUPABASE_KEY, 'GET',
          `/rest/v1/orders?order_num=eq.${orderNum}&select=telegram_id`
        )
        if (orders?.length > 0 && orders[0].telegram_id) {
          await sendTelegram(
            orders[0].telegram_id,
            `💧 <b>AquaDom — обновление заказа #${orderNum}</b>\n\n${statusMessages[cmd]}`
          )
        }
      }
    }

    return Response.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return Response.json({ ok: true })
  }
}
