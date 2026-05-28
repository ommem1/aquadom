'use client'
import { useState } from 'react'

const PHONE = '+998901860128'
const PHONE_DISPLAY = '+998 90 186 01 28'
const TG = 'https://t.me/aquadomm_bot'
const SITE = 'https://aquadom.uz'

const CLIENTS = [
  { icon: '🔧', name: 'СТО и автосервисы', desc: 'Дистиллят для долива в аккумуляторы и системы охлаждения. Постоянные поставки.' },
  { icon: '🏥', name: 'Клиники и медцентры', desc: 'Для стерилизаторов, увлажнителей воздуха и медицинского оборудования.' },
  { icon: '🔬', name: 'Лаборатории', desc: 'Двойная и тройная дистилляция для точных анализов и реактивов.' },
  { icon: '👔', name: 'Магазины одежды', desc: 'Для отпаривателей и паровых систем. Нет накипи — оборудование служит дольше.' },
  { icon: '🏭', name: 'Производства', desc: 'Технологическая вода для производственных процессов. Оптовые объёмы от 100 л.' },
  { icon: '🧺', name: 'Прачечные и химчистки', desc: 'Для паровых прессов и гладильного оборудования. Безналичный расчёт.' },
]

const ADVANTAGES = [
  { icon: '🏭', title: 'Собственное производство', text: 'Не перекупщики. Прямые поставки с производства без посредников.' },
  { icon: '📋', title: 'Все документы', text: 'Счёт-фактура, накладная, договор поставки. Полный документооборот.' },
  { icon: '🔄', title: 'Регулярные поставки', text: 'Составим график доставки под ваши потребности — еженедельно или ежемесячно.' },
  { icon: '📦', title: 'Любой объём', text: 'От 100 литров. Доставка по Ташкенту своим транспортом, по Узбекистану — курьерскими службами.' },
  { icon: '💳', title: 'Удобная оплата', text: 'Безналичный расчёт, Единый QR, наличные. Возможна рассрочка для постоянных клиентов.' },
  { icon: '👤', title: 'Персональный менеджер', text: 'Один контакт для всех вопросов: заказ, доставка, документы.' },
]

const PRODUCTS = [
  { name: 'Дистиллированная вода', desc: 'ГОСТ · pH = 0 · Для общего применения', volumes: '1.5 / 3 / 5 / 10 / 20 л' },
  { name: 'Двойная дистилляция', desc: 'Повышенная чистота · Для чувствительного оборудования', volumes: '5 / 10 / 20 л' },
  { name: 'Тройная дистилляция', desc: 'Лабораторная чистота · Для анализов и реактивов', volumes: '5 / 10 / 20 л' },
  { name: 'Электролит', desc: 'Для АКБ · Готовый к применению', volumes: '1 / 3 / 5 л' },
  { name: 'Вода с ионами серебра', desc: 'Антибактериальный эффект', volumes: '1.5 / 5 л' },
  { name: 'Оптом от 100 л', desc: 'Спецусловия · По согласованию', volumes: 'Любые объёмы' },
]

const STEPS = [
  { n: '01', title: 'Оставьте заявку', desc: 'Напишите в Telegram или заполните форму ниже. Укажите примерный объём и периодичность.' },
  { n: '02', title: 'Обсудим условия', desc: 'Менеджер свяжется в течение часа. Согласуем цену, объём, график и способ оплаты.' },
  { n: '03', title: 'Заключим договор', desc: 'Подпишем договор поставки. Для первой поставки — без предоплаты для проверенных компаний.' },
  { n: '04', title: 'Регулярные поставки', desc: 'Доставляем по согласованному графику. Всегда на связи для оперативных вопросов.' },
]

export default function B2BPage() {
  const [form, setForm] = useState({ company: '', name: '', phone: '+998', volume: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    if (!form.name || form.phone.length < 9) {
      setError('Введите контактное лицо и телефон')
      return
    }
    setLoading(true)
    setError('')
    try {
      const BOT_TOKEN_PLACEHOLDER = true // will use /api/callback
      const text = [
        '🏢 B2B ЗАЯВКА',
        '',
        form.company ? `Компания: ${form.company}` : null,
        `Контакт: ${form.name}`,
        `Телефон: ${form.phone}`,
        form.volume ? `Объём: ${form.volume}` : null,
        form.message ? `Комментарий: ${form.message}` : null,
      ].filter(Boolean).join('\n')

      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          product: form.company ? `B2B · ${form.company}` : 'B2B заявка',
          message: [form.volume ? `Объём: ${form.volume}` : null, form.message].filter(Boolean).join(' · ') || undefined,
        }),
      })
      const data = await res.json()
      if (data.success) setSuccess(true)
      else setError('Ошибка. Напишите нам напрямую в Telegram.')
    } catch {
      setError('Ошибка сети.')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '13px 16px', border: '1.5px solid #E5EEF8',
    borderRadius: 12, fontFamily: 'inherit', fontSize: 14, color: '#1A2332',
    background: '#F7F9FC', outline: 'none', transition: 'border 0.2s',
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Nunito', -apple-system, sans-serif; background: #F7F9FC; color: #1A2332; }
        a { text-decoration: none; }
        input:focus, textarea:focus { border-color: #1A6FB0 !important; background: white !important; }
        .tg-btn:hover { background: #0F4F85 !important; }
        .sub-btn:hover:not(:disabled) { background: #0F4F85 !important; }
        .adv-card:hover { box-shadow: 0 8px 24px rgba(15,28,46,0.08) !important; }
        .client-card:hover { border-color: #BEDAF5 !important; box-shadow: 0 6px 20px rgba(15,28,46,0.07) !important; }
        @media (max-width: 900px) {
          .adv-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .clients-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .hero-h { font-size: 30px !important; letter-spacing: -1px !important; }
          .hero-sec { padding: 56px 16px !important; }
          .adv-grid { grid-template-columns: 1fr !important; }
          .clients-grid { grid-template-columns: 1fr !important; }
          .products-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
          .hdr-phone { display: none !important; }
        }
      `}</style>

      {/* HEADER */}
      <header style={{ background: 'white', borderBottom: '1px solid #E5EEF8', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="34" height="34" viewBox="0 0 92 92" fill="none">
              <path d="M46 5C20 27 8 49 8 63C8 77 25 90 46 90C67 90 84 77 84 63C84 49 72 27 46 5Z" fill="#1A6FB0"/>
              <ellipse cx="30" cy="32" rx="8" ry="4" fill="white" opacity="0.18" transform="rotate(-25,30,32)"/>
              <polygon points="32,55 46,40 60,55" fill="white"/>
              <rect x="32" y="54" width="28" height="22" fill="white"/>
              <rect x="40" y="64" width="12" height="12" rx="3" fill="#1A6FB0"/>
              <rect x="34" y="58" width="7" height="6" rx="1" fill="#BEDAF5"/>
            </svg>
            <div>
              <div style={{ fontSize: 19, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.5px' }}>
                <span style={{ fontWeight: 300, color: '#1A6FB0' }}>Aqua</span><span style={{ color: '#0F4F85' }}>Dom</span>
              </div>
              <div style={{ fontSize: 10, color: '#5A7090', marginTop: 2 }}>Дистиллированная вода</div>
            </div>
          </a>
          <nav style={{ display: 'flex', gap: 24 }}>
            <a href="/" style={{ fontSize: 14, fontWeight: 600, color: '#5A7090' }}>Главная</a>
            <a href="/catalog" style={{ fontSize: 14, fontWeight: 600, color: '#5A7090' }}>Каталог</a>
            <a href="/b2b" style={{ fontSize: 14, fontWeight: 600, color: '#1A6FB0' }}>Для бизнеса</a>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href={`tel:${PHONE}`} className="hdr-phone" style={{ fontSize: 14, fontWeight: 700, color: '#1A2332' }}>{PHONE_DISPLAY}</a>
            <a href={TG} target="_blank" rel="noopener" style={{ background: '#1A6FB0', color: 'white', padding: '9px 20px', borderRadius: 50, fontSize: 13, fontWeight: 700 }}>Telegram</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-sec" style={{
        background: 'linear-gradient(150deg, #0D2547 0%, #1A5C96 60%, #1A6FB0 100%)',
        padding: '80px 24px', color: 'white', textAlign: 'center',
      }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 50, padding: '6px 18px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', marginBottom: 20 }}>
          🏢 Коммерческое предложение · AquaDom
        </div>
        <h1 className="hero-h" style={{ fontSize: 48, fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 16, maxWidth: 700, margin: '0 auto 16px' }}>
          Дистиллированная вода<br/>для вашего бизнеса
        </h1>
        <p style={{ fontSize: 17, opacity: 0.75, maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.65 }}>
          Производитель. Оптовые поставки от 100 л. Безналичный расчёт, счёт-фактура, персональный менеджер.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={TG} target="_blank" rel="noopener" className="tg-btn" style={{
            background: 'white', color: '#0F4F85', padding: '14px 32px',
            borderRadius: 50, fontSize: 15, fontWeight: 800, transition: 'background 0.2s',
          }}>✈ Написать в Telegram →</a>
          <a href="#form" style={{
            background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.35)',
            padding: '14px 32px', borderRadius: 50, fontSize: 15, fontWeight: 700,
          }}>Оставить заявку</a>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background: 'white', borderBottom: '1px solid #E5EEF8' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 24px', display: 'flex', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
          {[
            ['pH = 0', 'Абсолютная чистота'],
            ['ГОСТ', 'Сертификация'],
            ['100+ л', 'Минимальный объём'],
            ['Весь Узбекистан', 'Зона доставки'],
          ].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#0F4F85', letterSpacing: '-0.5px' }}>{val}</div>
              <div style={{ fontSize: 12, color: '#5A7090', fontWeight: 600, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHO WE WORK WITH */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#1A6FB0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Наши клиенты</div>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 8 }}>С кем мы работаем</div>
        <div style={{ fontSize: 15, color: '#5A7090', marginBottom: 40 }}>Поставляем воду бизнесу по всему Узбекистану</div>

        <div className="clients-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {CLIENTS.map(c => (
            <div key={c.name} className="client-card" style={{
              background: 'white', border: '1px solid #E5EEF8', borderRadius: 16,
              padding: 24, transition: 'all 0.2s',
            }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{c.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 6 }}>{c.name}</div>
              <div style={{ fontSize: 13, color: '#5A7090', lineHeight: 1.55 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ADVANTAGES */}
      <div style={{ background: 'white', borderTop: '1px solid #E5EEF8', borderBottom: '1px solid #E5EEF8' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#1A6FB0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Условия работы</div>
          <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 8 }}>Почему выбирают нас</div>
          <div style={{ fontSize: 15, color: '#5A7090', marginBottom: 40 }}>Прямые поставки от производителя без наценок посредников</div>

          <div className="adv-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {ADVANTAGES.map(a => (
              <div key={a.title} className="adv-card" style={{
                background: '#F7F9FC', border: '1px solid #E5EEF8', borderRadius: 16,
                padding: 24, transition: 'box-shadow 0.2s',
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{a.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 6 }}>{a.title}</div>
                <div style={{ fontSize: 13, color: '#5A7090', lineHeight: 1.55 }}>{a.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#1A6FB0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Ассортимент</div>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 8 }}>Наша продукция</div>
        <div style={{ fontSize: 15, color: '#5A7090', marginBottom: 40 }}>Цены обсуждаются индивидуально в зависимости от объёма и периодичности</div>

        <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {PRODUCTS.map(p => (
            <div key={p.name} style={{
              background: 'white', border: '1px solid #E5EEF8', borderRadius: 14,
              padding: 20, display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <div style={{ fontSize: 15, fontWeight: 800 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: '#1A6FB0', fontWeight: 600 }}>{p.desc}</div>
              <div style={{ fontSize: 12, color: '#5A7090', marginTop: 4 }}>📦 {p.volumes}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: '#F0F6FC', borderTop: '1px solid #E5EEF8', borderBottom: '1px solid #E5EEF8' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#1A6FB0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Процесс</div>
          <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 40 }}>Как начать работу</div>

          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {STEPS.map(s => (
              <div key={s.n} style={{ background: 'white', borderRadius: 16, border: '1px solid #E5EEF8', padding: 24 }}>
                <div style={{
                  fontSize: 13, fontWeight: 900, color: '#1A6FB0', letterSpacing: '0.05em',
                  marginBottom: 14, opacity: 0.6,
                }}>{s.n}</div>
                <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8, lineHeight: 1.3 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: '#5A7090', lineHeight: 1.55 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FORM */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }} id="form">
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Left: text */}
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#1A6FB0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Заявка</div>
            <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 16 }}>Обсудим условия</div>
            <div style={{ fontSize: 15, color: '#5A7090', lineHeight: 1.7, marginBottom: 32 }}>
              Оставьте заявку — менеджер свяжется в течение часа. Обсудим объёмы, периодичность, цену и документооборот.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href={TG} target="_blank" rel="noopener" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#1A6FB0', color: 'white', padding: '14px 24px',
                borderRadius: 50, fontSize: 14, fontWeight: 800, width: 'fit-content',
              }}>✈ Написать в Telegram</a>
              <a href={`tel:${PHONE}`} style={{ fontSize: 14, color: '#1A6FB0', fontWeight: 700 }}>
                📞 {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div style={{ flex: '1 1 400px', background: 'white', border: '1px solid #E5EEF8', borderRadius: 20, padding: 32 }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: 52, marginBottom: 14 }}>✅</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0F5A38', marginBottom: 8 }}>Заявка принята!</h3>
                <p style={{ fontSize: 14, color: '#1A8F5A', lineHeight: 1.6 }}>
                  Менеджер свяжется с вами в течение часа для обсуждения условий.
                </p>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 22 }}>Оставить заявку</div>

                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#5A7090', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>Компания</label>
                    <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="ООО «Название»" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#5A7090', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>Контактное лицо</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Имя" style={inputStyle} />
                  </div>
                </div>

                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#5A7090', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>Телефон</label>
                    <input
                      value={form.phone}
                      onChange={e => { const v = e.target.value; if (v.startsWith('+998')) setForm({ ...form, phone: v }) }}
                      placeholder="+998 90 000 00 00"
                      type="tel"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#5A7090', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>Примерный объём</label>
                    <input value={form.volume} onChange={e => setForm({ ...form, volume: e.target.value })} placeholder="100 л / месяц" style={inputStyle} />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#5A7090', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>
                    Комментарий <span style={{ fontWeight: 400, opacity: 0.6 }}>(необязательно)</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Вид продукции, периодичность, особые требования..."
                    rows={3}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                </div>

                {error && (
                  <div style={{ fontSize: 13, color: '#D85A30', background: '#FAECE7', padding: '10px 14px', borderRadius: 10, marginBottom: 14 }}>
                    {error}
                  </div>
                )}

                <button
                  onClick={submit}
                  disabled={loading}
                  className="sub-btn"
                  style={{
                    width: '100%', padding: 15, background: '#1A6FB0', color: 'white',
                    border: 'none', borderRadius: 50, fontFamily: 'inherit', fontSize: 15,
                    fontWeight: 800, cursor: loading ? 'default' : 'pointer',
                    opacity: loading ? 0.7 : 1, transition: 'background 0.2s',
                  }}
                >
                  {loading ? 'Отправляем...' : 'Отправить заявку →'}
                </button>
                <div style={{ fontSize: 12, color: '#5A7090', textAlign: 'center', marginTop: 10 }}>
                  Ответим в течение часа
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#0D2547', color: 'white', padding: '40px 24px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24, marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800 }}><span style={{ fontWeight: 300, opacity: 0.7 }}>Aqua</span>Dom</div>
              <div style={{ fontSize: 12, opacity: 0.4, marginTop: 4 }}>Дистиллированная вода для техники</div>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <a href={`tel:${PHONE}`} style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>📞 {PHONE_DISPLAY}</a>
              <a href={TG} target="_blank" rel="noopener" style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>✈ @aquadomm_bot</a>
              <a href={SITE} style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>🌐 aquadom.uz</a>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16, fontSize: 12, opacity: 0.3 }}>
            © 2025 AquaDom · Дистиллированная вода · Только для технических нужд
          </div>
        </div>
      </footer>
    </>
  )
}
