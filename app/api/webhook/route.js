async function sendTelegram(chatId, text) {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
  const res = await fetch('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: text })
  })
  return res.json()
}

async function supabaseQuery(url, key, method, path, body) {
  const res = await fetch(url + path, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': 'Bearer ' + key
    },
    body: body ? JSON.stringify(body) : undefined
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
    const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID
    const SUPABASE_URL = process.env.SUPABASE_URL
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY

    if (chatType === 'private') {
      if (text === '/start') {
        await sendTelegram(chatId, 'Добро пожаловать в AquaDom!\n\nВведите номер вашего заказа чтобы получать уведомления о доставке.\n\nНомер заказа указан на странице после оформления.')
        return Response.json({ ok: true })
      }

      if (/^\d{6}$/.test(text)) {
        const orderNum = text
        if (SUPABASE_URL && SUPABASE_KEY) {
          const orders = await supabaseQuery(
            SUPABASE_URL, SUPABASE_KEY, 'GET',
            '/rest/v1/orders?order_num=eq.' + orderNum + '&select=*'
          )
          if (orders && orders.length > 0) {
            await supabaseQuery(
              SUPABASE_URL, SUPABASE_KEY, 'PATCH',
              '/rest/v1/orders?order_num=eq.' + orderNum,
              { telegram_id: String(chatId) }
            )
            const statusMap = {'new':'В обработке','принят':'Принят','в_пути':'В пути','доставлен':'Доставлен','отменён':'Отменён'}
const currentStatus = statusMap[orders[0].status] || 'В обработке'
await sendTelegram(chatId, 'Заказ #' + orderNum + ' найден!\n\nТекущий статус: ' + currentStatus + '\n\nВы получите уведомление когда статус изменится.')
          } else {
            await sendTelegram(chatId, 'Заказ #' + orderNum + ' не найден. Проверьте номер и попробуйте снова.')
          }
        }
        return Response.json({ ok: true })
      }

      await sendTelegram(chatId, 'Введите 6-значный номер заказа из страницы подтверждения.')
      return Response.json({ ok: true })
    }

    if (String(chatId) !== String(ADMIN_CHAT_ID)) {
      return Response.json({ ok: true })
    }

    const parts = text.split(' ')
    const cmd = parts[0]
    const orderNum = parts[1]

    const statuses = {
      '/принят': 'Принят - мы свяжемся с вами в ближайшее время.',
      '/в_пути': 'В пути - курьер едет к вам!',
      '/доставлен': 'Доставлен - спасибо что выбрали AquaDom!',
      '/отменён': 'Отменён - свяжитесь с нами для уточнения.'
    }

    if (text === '/help') {
      await sendTelegram(chatId, 'AquaDom - Управление заказами\n\n/принят НОМЕР\n/в_пути НОМЕР\n/доставлен НОМЕР\n/отменён НОМЕР')
      return Response.json({ ok: true })
    }

    if (statuses[cmd] && orderNum) {
      await sendTelegram(chatId, 'Заказ #' + orderNum + ' -> ' + cmd.replace('/', ''))
      if (SUPABASE_URL && SUPABASE_KEY) {
        const orders = await supabaseQuery(
          SUPABASE_URL, SUPABASE_KEY, 'GET',
          '/rest/v1/orders?order_num=eq.' + orderNum + '&select=telegram_id'
        )
        if (orders && orders.length > 0 && orders[0].telegram_id) {
          await sendTelegram(
            orders[0].telegram_id,
            'AquaDom - обновление заказа #' + orderNum + '\n\n' + statuses[cmd]
          )
        }
      }
      return Response.json({ ok: true })
    }

    return Response.json({ ok: true })
  } catch (error) {
    return Response.json({ ok: true })
  }
}
