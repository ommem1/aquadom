const SITE_URL = 'https://aquadom.uz'
const PHONE = '+998 90 186 01 28'

async function sendTelegram(chatId, text) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const res = await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: text }),
  })
  return res.json()
}

async function supabaseQuery(url, key, method, path, body) {
  const res = await fetch(url + path, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': 'Bearer ' + key,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  return res.json()
}

export async function POST(request) {
  try {
    const body = await request.json()
    const message = body && body.message
    if (!message) return Response.json({ ok: true })

    const text = (message.text || '').trim()
    const chatId = message.chat && message.chat.id
    const chatType = message.chat && message.chat.type
    const from = message.from || {}
    const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID
    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY

    // ── ЛИЧНЫЙ ЧАТ С КЛИЕНТОМ ──────────────────────────────────────────────
    if (chatType === 'private') {

      if (text === '/start') {
        await sendTelegram(chatId,
          'Добро пожаловать в AquaDom!\n\n' +
          'Мы производим дистиллированную воду для техники.\n' +
          'Собственное производство · ГОСТ · pH = 0\n\n' +
          'Напишите ваш вопрос и менеджер ответит в рабочее время.\n\n' +
          'Каталог и цены: ' + SITE_URL + '/catalog\n' +
          'Телефон: ' + PHONE
        )
        return Response.json({ ok: true })
      }

      // Любое другое сообщение — пересылаем в группу администратора
      const userName = [from.first_name, from.last_name].filter(Boolean).join(' ') || 'Без имени'
      const userHandle = from.username ? '@' + from.username : 'нет username'

      await sendTelegram(ADMIN_CHAT_ID,
        'Сообщение от клиента\n\n' +
        'Имя: ' + userName + ' (' + userHandle + ')\n' +
        'ID: ' + chatId + '\n\n' +
        '"' + text + '"\n\n' +
        'Ответить: /ответить ' + chatId + ' ваш_текст'
      )

      await sendTelegram(chatId,
        'Сообщение получено. Менеджер ответит в рабочее время.'
      )
      return Response.json({ ok: true })
    }

    // ── ГРУППА АДМИНИСТРАТОРА ───────────────────────────────────────────────
    if (String(chatId) !== String(ADMIN_CHAT_ID)) {
      return Response.json({ ok: true })
    }

    // /ответить <chat_id> <текст>
    if (text.startsWith('/ответить ')) {
      const parts = text.split(' ')
      const targetId = parts[1]
      const replyText = parts.slice(2).join(' ')
      if (targetId && replyText) {
        await sendTelegram(targetId, 'AquaDom: ' + replyText)
        await sendTelegram(chatId, 'Сообщение отправлено клиенту ' + targetId)
      } else {
        await sendTelegram(chatId, 'Формат: /ответить <ID> <текст>')
      }
      return Response.json({ ok: true })
    }

    // /help
    if (text === '/help') {
      await sendTelegram(chatId,
        'Команды AquaDom\n\n' +
        'Статусы заказов:\n' +
        '/принят НОМЕР\n' +
        '/в_пути НОМЕР\n' +
        '/доставлен НОМЕР\n' +
        '/отменён НОМЕР\n\n' +
        'Ответить клиенту:\n' +
        '/ответить ID текст\n' +
        '(ID виден в пересланном сообщении)'
      )
      return Response.json({ ok: true })
    }

    // Команды статуса заказа
    const statusMessages = {
      '/принят': 'Ваш заказ принят. Менеджер свяжется с вами.',
      '/в_пути': 'Ваш заказ в пути. Курьер едет к вам.',
      '/доставлен': 'Заказ доставлен. Спасибо, что выбрали AquaDom!',
      '/отменён': 'Заказ отменён. Свяжитесь с нами для уточнения.',
    }

    const parts = text.split(' ')
    const cmd = parts[0]
    const orderNum = parts[1]

    if (statusMessages[cmd] && orderNum) {
      await sendTelegram(chatId, 'Заказ #' + orderNum + ' -> ' + cmd.replace('/', ''))

      if (SUPABASE_URL && SUPABASE_KEY) {
        const statusKey = cmd.replace('/', '')
        await supabaseQuery(SUPABASE_URL, SUPABASE_KEY, 'PATCH',
          '/rest/v1/orders?order_num=eq.' + orderNum,
          { status: statusKey }
        )
        const orders = await supabaseQuery(SUPABASE_URL, SUPABASE_KEY, 'GET',
          '/rest/v1/orders?order_num=eq.' + orderNum + '&select=telegram_id'
        )
        if (orders && orders.length > 0 && orders[0].telegram_id) {
          await sendTelegram(
            orders[0].telegram_id,
            'AquaDom - заказ #' + orderNum + '\n\n' + statusMessages[cmd]
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
