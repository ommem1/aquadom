'use client'
import { useState } from 'react'

const PHONE = '+998901860128'
const PHONE_DISPLAY = '+998 90 186 01 28'
const TG = 'https://t.me/aquadomm_bot'

const CLIENTS = [
  { icon: '🔧', name: 'СТО и автосервисы', desc: 'Дистиллят для долива в аккумуляторы и системы охлаждения. Постоянные поставки.' },
  { icon: '🏥', name: 'Клиники и медцентры', desc: 'Для стерилизаторов, увлажнителей воздуха и медицинского оборудования.' },
  { icon: '🔬', name: 'Лаборатории', desc: 'Двойная и тройная дистилляция для точных анализов и реактивов.' },
  { icon: '👔', name: 'Магазины одежды', desc: 'Для отпаривателей и паровых систем. Нет накипи — оборудование служит дольше.' },
  { icon: '🏭', name: 'Производства', desc: 'Технологическая вода для производственных процессов. Оптовые объёмы от 100 л.' },
  { icon: '🧺', name: 'Прачечные и химчистки', desc: 'Для паровых прессов и гладильного оборудования. Безналичный расчёт.' },
]

const ADVANTAGES = [
  { num: '01', title: 'Собственное производство', text: 'Не перекупщики. Прямые поставки с производства без посредников.' },
  { num: '02', title: 'Все документы', text: 'Счёт-фактура, накладная, договор поставки. Полный документооборот.' },
  { num: '03', title: 'Регулярные поставки', text: 'Составим график доставки под ваши потребности — еженедельно или ежемесячно.' },
  { num: '04', title: 'Любой объём', text: 'От 100 литров. Своим транспортом по Ташкенту, курьерскими — по Узбекистану.' },
  { num: '05', title: 'Удобная оплата', text: 'Безналичный расчёт, Единый QR, наличные. Рассрочка для постоянных клиентов.' },
  { num: '06', title: 'Персональный менеджер', text: 'Один контакт для всех вопросов: заказ, доставка, документы.' },
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
  { n: '01', title: 'Оставьте заявку', desc: 'Напишите в Telegram или заполните форму. Укажите примерный объём и периодичность.' },
  { n: '02', title: 'Обсудим условия', desc: 'Менеджер свяжется в течение часа. Согласуем цену, объём, график и способ оплаты.' },
  { n: '03', title: 'Заключим договор', desc: 'Подпишем договор поставки. Для первой поставки — без предоплаты для проверенных компаний.' },
  { n: '04', title: 'Регулярные поставки', desc: 'Доставляем по согласованному графику. Всегда на связи для оперативных вопросов.' },
]

const LOGO = (
  <svg width="36" height="36" viewBox="0 0 92 92" fill="none">
    <path d="M46 5C20 27 8 49 8 63C8 77 25 90 46 90C67 90 84 77 84 63C84 49 72 27 46 5Z" fill="#1A6FB0"/>
    <ellipse cx="30" cy="32" rx="8" ry="4" fill="white" opacity="0.18" transform="rotate(-25,30,32)"/>
    <polygon points="32,55 46,40 60,55" fill="white"/>
    <rect x="32" y="54" width="28" height="22" fill="white"/>
    <rect x="40" y="64" width="12" height="12" rx="3" fill="#1A6FB0"/>
    <rect x="34" y="58" width="7" height="6" rx="1" fill="#BEDAF5"/>
  </svg>
)

export default function B2BPage() {
  const [form, setForm] = useState({ company: '', name: '', phone: '+998', volume: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    if (!form.name || form.phone.length < 9) { setError('Введите контактное лицо и телефон'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, phone: form.phone,
          product: form.company ? `B2B · ${form.company}` : 'B2B заявка',
          message: [form.volume ? `Объём: ${form.volume}` : null, form.message].filter(Boolean).join(' · ') || undefined,
        }),
      })
      const data = await res.json()
      if (data.success) setSuccess(true)
      else setError('Ошибка. Напишите нам напрямую в Telegram.')
    } catch { setError('Ошибка сети.') }
    setLoading(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #fff; color: #0A0F1E; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }

        .hdr-nav a { font-size: 15px; font-weight: 500; color: #4A5568; transition: color 0.15s; }
        .hdr-nav a:hover, .hdr-nav a.active { color: #1A6FB0 !important; }

        .client-card { background: white; border: 1px solid #E8EFF8; border-radius: 20px; padding: 28px; transition: box-shadow 0.2s, transform 0.2s; }
        .client-card:hover { box-shadow: 0 10px 32px rgba(15,28,46,0.09); transform: translateY(-2px); }
        .adv-card { background: #F8FAFC; border: 1px solid #E8EFF8; border-radius: 20px; padding: 28px; transition: box-shadow 0.2s; }
        .adv-card:hover { box-shadow: 0 8px 24px rgba(15,28,46,0.07); }
        .prod-card { background: white; border: 1px solid #E8EFF8; border-radius: 16px; padding: 22px; }
        .step-card { background: white; border: 1px solid #E8EFF8; border-radius: 20px; padding: 28px; }

        .cta-tg { display: inline-flex; align-items: center; gap: 8px; background: #1A6FB0; color: white; padding: 14px 28px; border-radius: 50px; font-size: 15px; font-weight: 700; transition: background 0.2s; }
        .cta-tg:hover { background: #0F5090 !important; }
        .cta-ghost { display: inline-flex; align-items: center; gap: 8px; border: 1.5px solid #CBD5E1; color: #0A0F1E; padding: 14px 28px; border-radius: 50px; font-size: 15px; font-weight: 600; transition: border-color 0.2s; }
        .cta-ghost:hover { border-color: #1A6FB0 !important; background: #F0F7FF !important; }

        input, textarea { width: 100%; padding: 13px 15px; border: 1.5px solid #E2E8F0; border-radius: 12px; font-family: inherit; font-size: 15px; color: #0A0F1E; background: #F8FAFC; outline: none; transition: border-color 0.2s, background 0.2s; }
        input:focus, textarea:focus { border-color: #1A6FB0 !important; background: white !important; }
        .sub-btn { width: 100%; padding: 16px; background: #1A6FB0; color: white; border: none; border-radius: 50px; font-family: inherit; font-size: 16px; font-weight: 700; cursor: pointer; transition: background 0.2s; }
        .sub-btn:hover:not(:disabled) { background: #0F5090 !important; }
        .sub-btn:disabled { opacity: 0.6; cursor: default; }

        @media (max-width: 1024px) {
          .clients-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .adv-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .hdr-phone { display: none !important; }
          .b2b-form-layout { flex-direction: column !important; }
          .form-row { grid-template-columns: 1fr !important; }
          .hero-actions { flex-direction: column !important; align-items: center !important; }
        }
        @media (max-width: 640px) {
          .clients-grid, .adv-grid, .products-grid, .steps-grid { grid-template-columns: 1fr !important; }
          .hdr-nav { display: none !important; }
        }
      `}</style>

      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {LOGO}
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.5px' }}><span style={{ color: '#1A6FB0' }}>Aqua</span>Dom</div>
              <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2, letterSpacing: '0.05em' }}>ДИСТИЛЛИРОВАННАЯ ВОДА</div>
            </div>
          </a>
          <nav className="hdr-nav" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            <a href="/">Главная</a>
            <a href="/catalog">Каталог</a>
            <a href="/b2b" className="active">Для бизнеса</a>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href={`tel:${PHONE}`} className="hdr-phone" style={{ fontSize: 15, fontWeight: 600, color: '#0A0F1E' }}>{PHONE_DISPLAY}</a>
            <a href={TG} target="_blank" rel="noopener" style={{ background: '#1A6FB0', color: 'white', padding: '9px 20px', borderRadius: 50, fontSize: 14, fontWeight: 600 }}>Написать →</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', background: '#FAFCFF', padding: 'clamp(72px, 10vw, 112px) 28px', textAlign: 'center', borderBottom: '1px solid #E8EFF8' }}>
        <div style={{ position: 'absolute', right: -200, top: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,111,176,0.09) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', left: -150, bottom: -150, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,111,176,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, color: '#1A6FB0', marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }}/>
            Коммерческое предложение · AquaDom
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.08, color: '#0A0F1E', marginBottom: 20 }}>
            Дистиллированная вода<br/>
            <span style={{ color: '#1A6FB0' }}>для вашего бизнеса</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: '#64748B', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Производитель. Оптовые поставки от 100 л. Безналичный расчёт, счёт-фактура, персональный менеджер.
          </p>
          <div className="hero-actions" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={TG} target="_blank" rel="noopener" className="cta-tg">✈ Написать в Telegram →</a>
            <a href="#form" className="cta-ghost">Оставить заявку</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ background: 'white', borderBottom: '1px solid #E8EFF8' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
            {[['pH = 0', 'Абсолютная чистота'], ['ГОСТ', 'Сертификация'], ['100+ л', 'Минимальный объём'], ['Весь УЗ', 'Зона доставки']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center', padding: '22px 16px' }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#0A0F1E', letterSpacing: '-0.5px' }}>{val}</div>
                <div style={{ fontSize: 13, color: '#64748B', fontWeight: 500, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CLIENTS */}
      <section style={{ background: '#F8FAFC', padding: 'clamp(60px, 8vw, 88px) 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 44 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1A6FB0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Наши клиенты</div>
            <div style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#0A0F1E', lineHeight: 1.1, marginBottom: 12 }}>С кем мы работаем</div>
            <div style={{ fontSize: 17, color: '#64748B', lineHeight: 1.6 }}>Поставляем воду бизнесу по всему Узбекистану</div>
          </div>
          <div className="clients-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {CLIENTS.map(c => (
              <div key={c.name} className="client-card">
                <div style={{ width: 52, height: 52, background: '#EFF6FF', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 16 }}>{c.icon}</div>
                <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: '#0A0F1E' }}>{c.name}</div>
                <div style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section style={{ background: 'white', padding: 'clamp(60px, 8vw, 88px) 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 44 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1A6FB0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Условия работы</div>
            <div style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#0A0F1E', lineHeight: 1.1, marginBottom: 12 }}>Почему выбирают нас</div>
            <div style={{ fontSize: 17, color: '#64748B', lineHeight: 1.6 }}>Прямые поставки от производителя без наценок посредников</div>
          </div>
          <div className="adv-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {ADVANTAGES.map(a => (
              <div key={a.num} className="adv-card">
                <div style={{ fontSize: 13, fontWeight: 800, color: '#CBD5E1', letterSpacing: '0.05em', marginBottom: 16 }}>{a.num}</div>
                <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: '#0A0F1E' }}>{a.title}</div>
                <div style={{ fontSize: 14, color: '#64748B', lineHeight: 1.65 }}>{a.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section style={{ background: '#F8FAFC', padding: 'clamp(60px, 8vw, 88px) 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 44 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1A6FB0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Ассортимент</div>
            <div style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#0A0F1E', lineHeight: 1.1, marginBottom: 12 }}>Наша продукция</div>
            <div style={{ fontSize: 17, color: '#64748B', lineHeight: 1.6 }}>Цены обсуждаются индивидуально в зависимости от объёма и периодичности</div>
          </div>
          <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {PRODUCTS.map(p => (
              <div key={p.name} className="prod-card">
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0A0F1E', marginBottom: 6 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: '#1A6FB0', fontWeight: 600, marginBottom: 8 }}>{p.desc}</div>
                <div style={{ fontSize: 13, color: '#94A3B8', fontWeight: 500 }}>📦 {p.volumes}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section style={{ background: 'white', padding: 'clamp(60px, 8vw, 88px) 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 44 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1A6FB0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Процесс</div>
            <div style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#0A0F1E', lineHeight: 1.1 }}>Как начать работу</div>
          </div>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {STEPS.map(s => (
              <div key={s.n} className="step-card">
                <div style={{ fontSize: 13, fontWeight: 800, color: '#CBD5E1', letterSpacing: '0.05em', marginBottom: 16 }}>{s.n}</div>
                <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: '#0A0F1E', lineHeight: 1.3 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: '#64748B', lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="form" style={{ background: '#F8FAFC', padding: 'clamp(60px, 8vw, 88px) 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="b2b-form-layout" style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>
            {/* Left */}
            <div style={{ flex: '1 1 280px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1A6FB0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Заявка</div>
              <div style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 900, letterSpacing: '-1px', color: '#0A0F1E', lineHeight: 1.1, marginBottom: 16 }}>Обсудим условия</div>
              <div style={{ fontSize: 16, color: '#64748B', lineHeight: 1.7, marginBottom: 32 }}>
                Оставьте заявку — менеджер свяжется в течение часа. Обсудим объёмы, периодичность, цену и документооборот.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href={TG} target="_blank" rel="noopener" className="cta-tg" style={{ width: 'fit-content' }}>✈ Написать в Telegram</a>
                <a href={`tel:${PHONE}`} style={{ fontSize: 15, color: '#1A6FB0', fontWeight: 600 }}>📞 {PHONE_DISPLAY}</a>
              </div>
            </div>

            {/* Right: form */}
            <div style={{ flex: '1 1 400px', background: 'white', border: '1px solid #E8EFF8', borderRadius: 24, padding: 'clamp(28px, 4vw, 40px)' }}>
              {success ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: '#065F46', marginBottom: 10 }}>Заявка принята!</h3>
                  <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.65 }}>Менеджер свяжется с вами в течение часа для обсуждения условий.</p>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 24, color: '#0A0F1E' }}>Оставить заявку</div>
                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 7 }}>Компания</label>
                      <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="ООО «Название»"/>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 7 }}>Контактное лицо</label>
                      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Имя"/>
                    </div>
                  </div>
                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 7 }}>Телефон</label>
                      <input value={form.phone} onChange={e => { const v = e.target.value; if (v.startsWith('+998')) setForm({ ...form, phone: v }) }} placeholder="+998 90 000 00 00" type="tel"/>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 7 }}>Примерный объём</label>
                      <input value={form.volume} onChange={e => setForm({ ...form, volume: e.target.value })} placeholder="100 л / месяц"/>
                    </div>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 7 }}>
                      Комментарий <span style={{ fontWeight: 400, opacity: 0.6, textTransform: 'none', letterSpacing: 0 }}>(необязательно)</span>
                    </label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Вид продукции, периодичность, особые требования..." rows={3} style={{ resize: 'none' }}/>
                  </div>
                  {error && <div style={{ fontSize: 13, color: '#B91C1C', background: '#FEF2F2', padding: '11px 14px', borderRadius: 10, marginBottom: 16, border: '1px solid #FCA5A5' }}>{error}</div>}
                  <button onClick={submit} disabled={loading} className="sub-btn">
                    {loading ? 'Отправляем...' : 'Отправить заявку →'}
                  </button>
                  <div style={{ fontSize: 13, color: '#94A3B8', textAlign: 'center', marginTop: 12 }}>Ответим в течение часа</div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#080F1E', color: 'white', padding: 'clamp(48px, 6vw, 64px) 28px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24, marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {LOGO}
              <div style={{ fontSize: 18, fontWeight: 800 }}><span style={{ color: '#60A5FA' }}>Aqua</span>Dom</div>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <a href="/" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}>Главная</a>
              <a href="/catalog" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}>Каталог</a>
              <a href={`tel:${PHONE}`} style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>📞 {PHONE_DISPLAY}</a>
              <a href={TG} target="_blank" rel="noopener" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>✈ @aquadomm_bot</a>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 22, fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>
            © 2025 AquaDom — Не для питья · Только для технических нужд
          </div>
        </div>
      </footer>
    </>
  )
}
