'use client'
import { useState } from 'react'

const PHONE = '+998901860128'
const PHONE_DISPLAY = '+998 90 186 01 28'
const TG = 'https://t.me/aquadomm_bot'

const PRODUCTS = [
  { icon: '💧', name: 'Дистиллированная вода', desc: 'Стандартная дистилляция. ГОСТ. pH = 0. Для увлажнителей, утюгов, аккумуляторов и радиаторов.', slug: 'distilled' },
  { icon: '⚗️', name: 'Двойная дистилляция', desc: 'Повышенная степень очистки. Минимум примесей. Для чувствительного оборудования.', slug: 'double' },
  { icon: '🔬', name: 'Тройная дистилляция', desc: 'Максимальная чистота. Для лабораторий, медицины и прецизионного оборудования.', slug: 'triple' },
  { icon: '⚡', name: 'Электролит', desc: 'Специальный состав для обслуживания автомобильных и промышленных аккумуляторов.', slug: 'electrolyte' },
  { icon: '🥈', name: 'Вода с ионами серебра', desc: 'Антибактериальный эффект. Для увлажнителей и специального применения.', slug: 'silver' },
  { icon: '📦', name: 'Оптом от 100 л', desc: 'Для производств, прачечных, автосервисов. Оплата по безналу, счёт-фактура.', slug: 'bulk' },
]

const STATS = [
  { value: '4.9', label: '★ рейтинг на Uzum', href: 'https://uzum.uz/ru/shop/distillirovannayavoda' },
  { value: '500+', label: 'заказов выполнено', href: null },
  { value: 'ГОСТ', label: 'сертифицировано', href: null },
  { value: '≤2 ч', label: 'доставка по Ташкенту', href: null },
]

const FEATURES = [
  { num: '01', title: 'Собственное производство', text: 'Мы производитель, не перекупщик. Полный контроль качества — от дистилляции до розлива.' },
  { num: '02', title: 'Соответствие ГОСТ', text: 'Вся продукция соответствует государственному стандарту. Документы прилагаются.' },
  { num: '03', title: 'pH = 0 — абсолютная чистота', text: 'Ноль примесей, солей и органики. Проверяем каждую партию перед отгрузкой.' },
  { num: '04', title: 'Доставка по всему Узбекистану', text: 'По Ташкенту — своя служба, до двери за 2 часа. По регионам — партнёрские курьеры.' },
]

const REVIEWS = [
  { name: 'Елена', product: 'Двойная дистилляция, 3 л', text: 'Быстрая доставка, вода абсолютно прозрачная. Расходуется в утюге намного медленнее, пар более ровный — заметно лучше, чем у воды от другого продавца. Спасибо за качество!', date: 'ноябрь 2025' },
  { name: 'Юлия', product: 'Вода для увлажнителей, 10 л', text: 'Покупала для увлажнителя воздуха и генератора кислорода. Доставили быстро, до двери квартиры. Буду покупать здесь и впредь. Спасибо!', date: 'март 2026' },
  { name: 'Mirzohid', product: 'Дистиллированная вода, 5 л', text: 'Проверил тестером — показало 0.000. Это говорит о том, что вода действительно чистая. Отличное качество!', date: 'октябрь 2025' },
  { name: 'Юлия', product: 'Дист. вода для утюгов, 5 л', text: 'Не первый раз берём у этого продавца. Очень рады, что теперь он появился на Uzum. Рекомендуем!', date: 'октябрь 2024' },
  { name: 'Покупатель', product: 'Двойная дистилляция, 10 л', text: 'Качественная вода для косметологии — для лазерного аппарата в самый раз. Привезли с бесплатной доставкой через пару часов после заказа!', date: 'март 2026' },
  { name: 'Дурдона', product: 'Дистиллированная вода, 5 л', text: 'Оригинал. Спасибо поставщику — быстро доставили, вежливый персонал.', date: 'февраль 2026' },
  { name: 'Мадина', product: 'Дистиллированная вода, 3 л', text: 'Товар получила в целости и сохранности. Всем рекомендую, покупайте!', date: 'май 2025' },
  { name: 'Татьяна', product: 'Дистиллированная вода, 1.5 л', text: 'Отлично, никаких претензий нет. Рекомендую.', date: 'июнь 2025' },
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

export default function Home() {
  const [form, setForm] = useState({ name: '', phone: '+998', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    if (!form.name || form.phone.length < 9) { setError('Введите имя и номер телефона'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/callback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.success) setSuccess(true)
      else setError('Ошибка. Напишите нам в Telegram.')
    } catch { setError('Ошибка сети. Попробуйте ещё раз.') }
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

        /* Header */
        .hdr-nav a { font-size: 15px; font-weight: 500; color: #4A5568; transition: color 0.15s; }
        .hdr-nav a:hover { color: #1A6FB0 !important; }
        .hdr-nav a.active { color: #1A6FB0 !important; }

        /* Hero */
        .hero-blob { position: absolute; border-radius: 50%; pointer-events: none; }
        .hero-h1 { font-size: clamp(44px, 7vw, 80px); font-weight: 900; letter-spacing: -2.5px; line-height: 1.05; color: #0A0F1E; }
        .hero-sub { font-size: clamp(16px, 2vw, 19px); color: #64748B; line-height: 1.7; }
        .hero-cta-primary { background: #1A6FB0; color: white; padding: 15px 32px; border-radius: 50px; font-size: 16px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; transition: background 0.2s, transform 0.15s; }
        .hero-cta-primary:hover { background: #0F5090 !important; transform: translateY(-1px); }
        .hero-cta-ghost { border: 1.5px solid #CBD5E1; color: #0A0F1E; padding: 15px 32px; border-radius: 50px; font-size: 16px; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; transition: border-color 0.2s, background 0.2s; }
        .hero-cta-ghost:hover { border-color: #1A6FB0 !important; background: #F0F7FF !important; }

        /* Stats */
        .stat-chip { display: flex; flex-direction: column; align-items: center; padding: 20px 28px; border-radius: 16px; background: white; border: 1px solid #E8EFF8; transition: box-shadow 0.2s, transform 0.2s; cursor: default; }
        .stat-chip:hover { box-shadow: 0 8px 24px rgba(26,111,176,0.1); transform: translateY(-2px); }
        .stat-chip.link-chip { cursor: pointer; }

        /* Products */
        .prod-card { background: white; border: 1px solid #E8EFF8; border-radius: 20px; padding: 28px; display: flex; flex-direction: column; gap: 10px; cursor: pointer; transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s; }
        .prod-card:hover { box-shadow: 0 12px 36px rgba(15,28,46,0.1); border-color: #93C5E8 !important; transform: translateY(-2px); }
        .prod-icon-wrap { width: 52px; height: 52px; background: #EFF6FF; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 26px; margin-bottom: 4px; }

        /* Features */
        .feat-card { background: white; border: 1px solid #E8EFF8; border-radius: 20px; padding: 32px; transition: box-shadow 0.2s; }
        .feat-card:hover { box-shadow: 0 8px 28px rgba(15,28,46,0.07); }

        /* Reviews */
        .reviews-track { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 8px; scroll-snap-type: x mandatory; scrollbar-width: none; }
        .reviews-track::-webkit-scrollbar { display: none; }
        .review-card { scroll-snap-align: start; flex-shrink: 0; width: 320px; background: white; border-radius: 20px; padding: 24px; box-shadow: 0 2px 16px rgba(15,28,46,0.06); border: 1px solid #E8EFF8; display: flex; flex-direction: column; gap: 14px; }

        /* Buttons */
        .cta-blue { background: #1A6FB0; color: white; padding: 14px 28px; border-radius: 50px; font-size: 15px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; transition: background 0.2s; }
        .cta-blue:hover { background: #0F5090 !important; }
        .cta-outline { border: 1.5px solid #CBD5E1; color: #0A0F1E; padding: 14px 28px; border-radius: 50px; font-size: 15px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; transition: border-color 0.2s; }
        .cta-outline:hover { border-color: #1A6FB0 !important; }
        .uzum-badge:hover { box-shadow: 0 4px 16px rgba(26,111,176,0.15) !important; }

        /* Form */
        input, textarea { width: 100%; padding: 14px 16px; border: 1.5px solid #E2E8F0; border-radius: 12px; font-family: inherit; font-size: 15px; color: #0A0F1E; background: #F8FAFC; outline: none; transition: border-color 0.2s, background 0.2s; }
        input:focus, textarea:focus { border-color: #1A6FB0 !important; background: white !important; }
        .sub-btn { width: 100%; padding: 16px; background: #1A6FB0; color: white; border: none; border-radius: 50px; font-family: inherit; font-size: 16px; font-weight: 700; cursor: pointer; transition: background 0.2s; }
        .sub-btn:hover:not(:disabled) { background: #0F5090 !important; }
        .sub-btn:disabled { opacity: 0.6; cursor: default; }

        /* Footer */
        .ft-link { font-size: 14px; color: rgba(255,255,255,0.55); transition: color 0.2s; }
        .ft-link:hover { color: white !important; }

        /* Responsive */
        @media (max-width: 1024px) {
          .prod-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .feat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .hdr-phone { display: none !important; }
          .stats-row { grid-template-columns: repeat(2, 1fr) !important; }
          .b2b-inner { flex-direction: column !important; gap: 24px !important; }
          .review-card { width: 280px; }
          .hero-actions { flex-direction: column !important; align-items: center !important; }
          .hero-cta-primary, .hero-cta-ghost { width: 100%; max-width: 320px; justify-content: center; }
        }
        @media (max-width: 640px) {
          .prod-grid { grid-template-columns: 1fr !important; }
          .feat-grid { grid-template-columns: 1fr !important; }
          .hdr-nav { display: none !important; }
          .ft-cols { flex-direction: column !important; gap: 32px !important; }
        }
      `}</style>

      {/* ── HEADER ─────────────────────────────────────── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {LOGO}
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.5px', color: '#0A0F1E' }}>
                <span style={{ color: '#1A6FB0' }}>Aqua</span>Dom
              </div>
              <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2, letterSpacing: '0.05em' }}>ДИСТИЛЛИРОВАННАЯ ВОДА</div>
            </div>
          </a>

          <nav className="hdr-nav" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            <a href="/" className="active">Главная</a>
            <a href="/catalog">Каталог</a>
            <a href="/b2b">Для бизнеса</a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href={`tel:${PHONE}`} className="hdr-phone" style={{ fontSize: 15, fontWeight: 600, color: '#0A0F1E' }}>{PHONE_DISPLAY}</a>
            <a href={TG} target="_blank" rel="noopener" style={{ background: '#1A6FB0', color: 'white', padding: '9px 20px', borderRadius: 50, fontSize: 14, fontWeight: 600 }}>
              Написать →
            </a>
          </div>
        </div>
      </header>

      {/* ── WARNING ─────────────────────────────────────── */}
      <div style={{ background: '#FFFBEB', borderBottom: '1px solid #FDE68A', padding: '9px 24px', textAlign: 'center', fontSize: 13, color: '#92400E', fontWeight: 500 }}>
        ⚠️ Дистиллированная вода — <strong>не для питья</strong>. Только для технических нужд.
      </div>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(72px, 10vw, 120px) 28px clamp(80px, 10vw, 120px)', textAlign: 'center', background: '#FAFCFF' }}>
        {/* Decorative blobs */}
        <div className="hero-blob" style={{ width: 700, height: 700, right: -200, top: -200, background: 'radial-gradient(circle, rgba(26,111,176,0.10) 0%, transparent 70%)' }}/>
        <div className="hero-blob" style={{ width: 500, height: 500, left: -150, bottom: -150, background: 'radial-gradient(circle, rgba(26,111,176,0.07) 0%, transparent 70%)' }}/>

        <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 50, padding: '6px 18px', fontSize: 13, fontWeight: 600, color: '#1A6FB0', marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }}/>
            Производитель · ГОСТ · pH = 0
          </div>

          {/* H1 */}
          <h1 className="hero-h1" style={{ marginBottom: 24 }}>
            Дистиллированная вода<br/>
            <span style={{ color: '#1A6FB0' }}>для вашей техники</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub" style={{ maxWidth: 520, margin: '0 auto 40px' }}>
            Собственное производство в Ташкенте. Для увлажнителей, утюгов,
            аккумуляторов и радиаторов. Доставка по всему Узбекистану.
          </p>

          {/* CTAs */}
          <div className="hero-actions" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/catalog" className="hero-cta-primary">
              Смотреть каталог →
            </a>
            <a href={TG} target="_blank" rel="noopener" className="hero-cta-ghost">
              ✈ Написать в Telegram
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <div style={{ background: 'white', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 28px' }}>
          <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
            {STATS.map((s, i) => (
              s.href
                ? <a key={i} href={s.href} target="_blank" rel="noopener" className="stat-chip link-chip" style={{ textDecoration: 'none', borderRadius: i === 0 ? '0 0 0 0' : undefined }}>
                    <span style={{ fontSize: 26, fontWeight: 900, color: '#1A6FB0', letterSpacing: '-1px' }}>{s.value}</span>
                    <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500, marginTop: 2, textAlign: 'center' }}>{s.label}</span>
                  </a>
                : <div key={i} className="stat-chip">
                    <span style={{ fontSize: 26, fontWeight: 900, color: '#0A0F1E', letterSpacing: '-1px' }}>{s.value}</span>
                    <span style={{ fontSize: 13, color: '#64748B', fontWeight: 500, marginTop: 2, textAlign: 'center' }}>{s.label}</span>
                  </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRODUCTS ─────────────────────────────────────── */}
      <section style={{ background: '#F8FAFC', padding: 'clamp(60px, 8vw, 96px) 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1A6FB0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Продукция</div>
            <div style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#0A0F1E', lineHeight: 1.1, marginBottom: 12 }}>
              Что мы производим
            </div>
            <div style={{ fontSize: 17, color: '#64748B', lineHeight: 1.6, maxWidth: 500 }}>
              Полная линейка от стандартной дистилляции до тройной очистки
            </div>
          </div>

          <div className="prod-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
            {PRODUCTS.map(p => (
              <a key={p.name} href="/catalog" className="prod-card">
                <div className="prod-icon-wrap">{p.icon}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#0A0F1E', letterSpacing: '-0.3px' }}>{p.name}</div>
                <div style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, flexGrow: 1 }}>{p.desc}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1A6FB0', marginTop: 8 }}>Смотреть товары →</div>
              </a>
            ))}
          </div>

          <a href="/catalog" className="cta-blue">
            Весь каталог с ценами →
          </a>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section style={{ background: 'white', padding: 'clamp(60px, 8vw, 96px) 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1A6FB0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Преимущества</div>
            <div style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#0A0F1E', lineHeight: 1.1, marginBottom: 12 }}>
              Почему выбирают AquaDom
            </div>
            <div style={{ fontSize: 17, color: '#64748B', lineHeight: 1.6, maxWidth: 440 }}>
              Мы не перекупщики — мы производим воду сами
            </div>
          </div>

          <div className="feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {FEATURES.map(f => (
              <div key={f.num} className="feat-card">
                <div style={{ fontSize: 13, fontWeight: 800, color: '#CBD5E1', letterSpacing: '0.05em', marginBottom: 16 }}>{f.num}</div>
                <div style={{ fontSize: 19, fontWeight: 700, color: '#0A0F1E', letterSpacing: '-0.3px', marginBottom: 10 }}>{f.title}</div>
                <div style={{ fontSize: 15, color: '#64748B', lineHeight: 1.7 }}>{f.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────── */}
      <section style={{ background: '#F0F6FF', padding: 'clamp(60px, 8vw, 96px) 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1A6FB0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Отзывы</div>
              <div style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, letterSpacing: '-1px', color: '#0A0F1E', lineHeight: 1.1 }}>
                Что говорят покупатели
              </div>
            </div>
            <a href="https://uzum.uz/ru/shop/distillirovannayavoda" target="_blank" rel="noopener" className="uzum-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', border: '1px solid #BFDBFE', borderRadius: 50, padding: '10px 20px', transition: 'box-shadow 0.2s' }}>
              <span style={{ color: '#F59E0B', fontSize: 17 }}>★</span>
              <span style={{ fontWeight: 800, fontSize: 17, color: '#0A0F1E' }}>4.9</span>
              <span style={{ color: '#64748B', fontSize: 14 }}>на Uzum Market</span>
            </a>
          </div>

          <div className="reviews-track">
            {REVIEWS.map((r, i) => {
              const initials = r.name === 'Покупатель' ? '?' : r.name[0].toUpperCase()
              const colors = ['#1A6FB0','#0F4F85','#2585CC','#1A5C96','#0D3A6E','#1E7BC4','#0A3260','#1560A0']
              return (
                <div key={i} className="review-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: colors[i % colors.length], color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, flexShrink: 0 }}>{initials}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#0A0F1E' }}>{r.name}</div>
                      <div style={{ color: '#F59E0B', fontSize: 14, letterSpacing: 2 }}>★★★★★</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.65, flexGrow: 1 }}>
                    &ldquo;{r.text}&rdquo;
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ background: '#EFF6FF', color: '#1A6FB0', borderRadius: 50, padding: '3px 12px', fontSize: 11, fontWeight: 600 }}>{r.product}</span>
                    <span style={{ fontSize: 12, color: '#94A3B8' }}>{r.date}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── B2B ──────────────────────────────────────────── */}
      <section style={{ background: 'white', padding: 'clamp(60px, 8vw, 96px) 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="b2b-inner" style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F3460 50%, #1A5C96 100%)', borderRadius: 24, padding: 'clamp(36px, 5vw, 56px)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32 }}>
            <div style={{ maxWidth: 560 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Для бизнеса</div>
              <div style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.2, marginBottom: 14 }}>
                Особые условия для компаний
              </div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginBottom: 20 }}>
                Крупные объёмы, оплата по безналу, счёт-фактура, персональный менеджер.
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['СТО', 'Клиники', 'Лаборатории', 'Химчистки', 'Производства'].map(t => (
                  <span key={t} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 50, padding: '5px 14px', fontSize: 13, fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              <a href="/b2b" style={{ background: 'white', color: '#0F3460', padding: '14px 28px', borderRadius: 50, fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'center', transition: 'opacity 0.2s' }}>
                Подробнее →
              </a>
              <a href={TG} target="_blank" rel="noopener" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', padding: '14px 28px', borderRadius: 50, fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap', display: 'inline-block', textAlign: 'center' }}>
                ✈ Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM ─────────────────────────────────────────── */}
      <section id="callback" style={{ background: '#F8FAFC', padding: 'clamp(60px, 8vw, 96px) 28px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1A6FB0', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Заявка</div>
            <div style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 900, letterSpacing: '-1px', color: '#0A0F1E', lineHeight: 1.1, marginBottom: 12 }}>
              Оставьте заявку
            </div>
            <div style={{ fontSize: 16, color: '#64748B' }}>Менеджер свяжется в течение часа</div>
          </div>

          <div style={{ background: 'white', border: '1px solid #E8EFF8', borderRadius: 24, padding: 'clamp(28px, 5vw, 44px)' }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#065F46', marginBottom: 10 }}>Заявка принята!</h3>
                <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.65 }}>
                  Менеджер свяжется с вами в течение часа.<br/>
                  Или напишите сами: <a href={TG} style={{ color: '#1A6FB0', fontWeight: 700 }}>@aquadomm_bot</a>
                </p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 7 }}>Имя</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя"/>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 7 }}>Телефон</label>
                  <input value={form.phone} onChange={e => { const v = e.target.value; if (v.startsWith('+998')) setForm({ ...form, phone: v }) }} placeholder="+998 90 000 00 00" type="tel"/>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 7 }}>
                    Сообщение <span style={{ fontWeight: 400, opacity: 0.6, textTransform: 'none', letterSpacing: 0 }}>(необязательно)</span>
                  </label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Какой объём нужен, как часто..." rows={3} style={{ resize: 'vertical' }}/>
                </div>
                {error && (
                  <div style={{ fontSize: 14, color: '#B91C1C', background: '#FEF2F2', padding: '11px 14px', borderRadius: 10, marginBottom: 16, border: '1px solid #FCA5A5' }}>{error}</div>
                )}
                <button className="sub-btn" onClick={submit} disabled={loading}>
                  {loading ? 'Отправляем...' : 'Отправить заявку →'}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{ background: '#080F1E', color: 'white', padding: 'clamp(48px, 6vw, 72px) 28px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="ft-cols" style={{ display: 'flex', justifyContent: 'space-between', gap: 40, marginBottom: 48 }}>
            <div style={{ maxWidth: 240 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                {LOGO}
                <div style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>
                  <span style={{ color: '#60A5FA' }}>Aqua</span>Dom
                </div>
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                Дистиллированная вода для техники. Только для технических нужд, не для питья.
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Разделы</div>
              <a href="/" className="ft-link">Главная</a>
              <a href="/catalog" className="ft-link">Каталог</a>
              <a href="/b2b" className="ft-link">Для бизнеса</a>
              <a href="#callback" className="ft-link">Оставить заявку</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Контакты</div>
              <a href={`tel:${PHONE}`} className="ft-link" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>📞 {PHONE_DISPLAY}</a>
              <a href={TG} target="_blank" rel="noopener" className="ft-link" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>✈ @aquadomm_bot</a>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>📍 Ташкент и весь Узбекистан</div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, fontSize: 13, color: 'rgba(255,255,255,0.25)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <span>© 2025 AquaDom — Дистиллированная вода</span>
            <span>Не для питья · Только для технических нужд</span>
          </div>
        </div>
      </footer>
    </>
  )
}
