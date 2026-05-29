'use client'
import { useState } from 'react'

const PHONE = '+998901860128'
const PHONE_DISPLAY = '+998 90 186 01 28'
const TG = 'https://t.me/aquadomm_bot'

const PRODUCTS = [
  { icon: '💧', name: 'Дистиллированная вода', desc: 'Стандартная дистилляция. ГОСТ. pH = 0. Для увлажнителей, утюгов, аккумуляторов и радиаторов.' },
  { icon: '⚗️', name: 'Двойная дистилляция', desc: 'Повышенная степень очистки. Минимум примесей. Для чувствительного оборудования.' },
  { icon: '🔬', name: 'Тройная дистилляция', desc: 'Максимальная чистота. Для лабораторий, медицины и прецизионного оборудования.' },
  { icon: '⚡', name: 'Электролит', desc: 'Специальный состав для обслуживания автомобильных и промышленных аккумуляторов.' },
  { icon: '🥈', name: 'Вода с ионами серебра', desc: 'Антибактериальный эффект. Для увлажнителей и специального применения.' },
  { icon: '📦', name: 'Оптом от 100 л', desc: 'Для производств, прачечных, автосервисов. Оплата по безналу, счёт-фактура.' },
]

const WHY = [
  { icon: '🏭', title: 'Собственное производство', text: 'Мы производитель, не перекупщик. Полный контроль качества от дистилляции до розлива.' },
  { icon: '🏅', title: 'Соответствие ГОСТ', text: 'Вся продукция соответствует государственному стандарту качества.' },
  { icon: '🧪', title: 'pH = 0 — абсолютная чистота', text: 'Ноль примесей, солей и органики. Это наш стандарт для каждой партии.' },
  { icon: '🚚', title: 'Доставка по всему Узбекистану', text: 'По Ташкенту — своя курьерская служба. По регионам — партнёрские курьерские компании.' },
]

const REVIEWS = [
  {
    name: 'Елена',
    product: 'Двойная дистилляция, 3 л',
    text: 'Быстрая доставка, вода хорошо упакована, абсолютно прозрачная. Расходуется в утюге намного медленнее, пар более ровный — заметно лучше, чем у воды от другого продавца. Спасибо за качество!',
    date: 'ноябрь 2025',
  },
  {
    name: 'Юлия',
    product: 'Вода для увлажнителей, 10 л',
    text: 'Покупала для увлажнителя воздуха и генератора кислорода. Доставили быстро, до двери квартиры. Буду покупать здесь и впредь. Спасибо!',
    date: 'март 2026',
  },
  {
    name: 'Mirzohid',
    product: 'Дистиллированная вода, 5 л',
    text: 'Проверил тестером — показало 0.000. Это говорит о том, что вода действительно чистая. Отличное качество!',
    date: 'октябрь 2025',
  },
  {
    name: 'Юлия',
    product: 'Дист. вода для утюгов, 5 л',
    text: 'Не первый раз берём у этого продавца. Очень рады, что теперь он появился на Uzum. Рекомендуем!',
    date: 'октябрь 2024',
  },
  {
    name: 'Покупатель',
    product: 'Двойная дистилляция, 10 л',
    text: 'Качественная вода для косметологии — для лазерного аппарата в самый раз. Привезли с бесплатной доставкой через пару часов после заказа!',
    date: 'март 2026',
  },
  {
    name: 'Дурдона',
    product: 'Дистиллированная вода, 5 л',
    text: 'Оригинал. Спасибо поставщику — быстро доставили, вежливый персонал.',
    date: 'февраль 2026',
  },
  {
    name: 'Мадина',
    product: 'Дистиллированная вода, 3 л',
    text: 'Товар получила в целости и сохранности. Всем рекомендую, покупайте!',
    date: 'май 2025',
  },
  {
    name: 'Татьяна',
    product: 'Дистиллированная вода, 1.5 л',
    text: 'Отлично, никаких претензий нет. Рекомендую.',
    date: 'июнь 2025',
  },
]

function Header() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'white', borderBottom: '1px solid #E5EEF8',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '12px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
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
              <span style={{ fontWeight: 300, color: '#1A6FB0' }}>Aqua</span>
              <span style={{ color: '#0F4F85' }}>Dom</span>
            </div>
            <div style={{ fontSize: 10, color: '#5A7090', marginTop: 2 }}>Дистиллированная вода</div>
          </div>
        </a>

        <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="hdr-nav">
          <a href="/" style={{ fontSize: 14, fontWeight: 600, color: '#1A6FB0', textDecoration: 'none' }}>Главная</a>
          <a href="/catalog" style={{ fontSize: 14, fontWeight: 600, color: '#5A7090', textDecoration: 'none' }}>Каталог</a>
          <a href="/b2b" style={{ fontSize: 14, fontWeight: 600, color: '#5A7090', textDecoration: 'none' }}>Для бизнеса</a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href={`tel:${PHONE}`} className="hdr-phone" style={{
            fontSize: 14, fontWeight: 700, color: '#1A2332', textDecoration: 'none',
          }}>{PHONE_DISPLAY}</a>
          <a href={TG} target="_blank" rel="noopener" style={{
            background: '#1A6FB0', color: 'white', padding: '9px 20px',
            borderRadius: 50, fontSize: 13, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap',
          }}>Telegram</a>
        </div>
      </div>
    </header>
  )
}

export default function Home() {
  const [form, setForm] = useState({ name: '', phone: '+998', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    if (!form.name || form.phone.length < 9) {
      setError('Введите имя и номер телефона')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) setSuccess(true)
      else setError('Ошибка. Напишите нам в Telegram.')
    } catch {
      setError('Ошибка сети. Попробуйте ещё раз.')
    }
    setLoading(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Nunito', -apple-system, sans-serif; background: #F7F9FC; color: #1A2332; }
        a { text-decoration: none; }
        a:hover { text-decoration: none; }

        .hdr-nav a:hover { color: #1A6FB0 !important; }

        .hero-badge-item + .hero-badge-item::before {
          content: '·'; margin: 0 8px; opacity: 0.4;
        }

        .prod-card:hover { box-shadow: 0 10px 32px rgba(15,28,46,0.1); border-color: #BEDAF5 !important; }
        .why-card:hover { box-shadow: 0 8px 24px rgba(15,28,46,0.07); }
        .catalog-link:hover { background: #0F4F85 !important; }
        .b2b-btn:hover { background: #E8F4FD !important; }
        .uzum-badge:hover { box-shadow: 0 4px 16px rgba(26,111,176,0.15) !important; }
        .reviews-track { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 8px; scroll-snap-type: x mandatory; scrollbar-width: none; }
        .reviews-track::-webkit-scrollbar { display: none; }
        .review-card { scroll-snap-align: start; flex-shrink: 0; width: 300px; background: white; border-radius: 18px; padding: 22px; box-shadow: 0 2px 14px rgba(15,28,46,0.07); border: 1px solid #EEF3FA; display: flex; flex-direction: column; gap: 12px; }
        @media (max-width: 640px) { .review-card { width: 270px; } }
        .sub-btn:hover:not(:disabled) { background: #0F4F85 !important; }
        .ft-link:hover { color: white !important; }
        .ft-contact:hover { color: white !important; }

        input:focus, textarea:focus {
          border-color: #1A6FB0 !important;
          background: white !important;
        }

        @media (max-width: 900px) {
          .prod-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .hero-h1 { font-size: 32px !important; letter-spacing: -1px !important; }
          .hero-p { font-size: 15px !important; }
          .prod-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .b2b-inner { flex-direction: column !important; }
          .form-wrap { padding: 24px 16px !important; }
          .sec-h { font-size: 24px !important; }
          .hdr-phone { display: none !important; }
          .ft-top { flex-direction: column !important; gap: 28px !important; }
        }
        @media (max-width: 420px) {
          .hero-h1 { font-size: 26px !important; }
          .hero-sec { padding: 56px 16px !important; }
          .hdr-nav { display: none !important; }
        }
      `}</style>

      <Header />

      {/* WARN */}
      <div style={{
        background: '#FFF3CD', borderBottom: '1px solid #FFE082',
        padding: '8px 24px', textAlign: 'center', fontSize: 12, color: '#7B5800', fontWeight: 600,
      }}>
        ⚠️ Дистиллированная вода — <strong>не для питья</strong>. Только для технических нужд.
      </div>

      {/* HERO */}
      <section className="hero-sec" style={{
        background: 'linear-gradient(150deg, #0D2547 0%, #1A5C96 55%, #1A6FB0 100%)',
        padding: '80px 24px', textAlign: 'center', color: 'white',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 50, padding: '7px 20px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', gap: 0,
          }}>
            <span className="hero-badge-item">🏭 Производитель</span>
            <span className="hero-badge-item">🏅 ГОСТ</span>
            <span className="hero-badge-item">🧪 pH = 0</span>
          </div>
        </div>

        <h1 className="hero-h1" style={{
          fontSize: 52, fontWeight: 900, lineHeight: 1.08,
          letterSpacing: '-2px', marginBottom: 16,
          maxWidth: 680, marginLeft: 'auto', marginRight: 'auto',
        }}>
          Дистиллированная вода<br/>для техники
        </h1>

        <p className="hero-p" style={{
          fontSize: 17, opacity: 0.75, maxWidth: 480,
          margin: '0 auto 36px', lineHeight: 1.65,
        }}>
          Собственное производство. Для увлажнителей, утюгов, аккумуляторов и радиаторов.
          Доставка по всему Узбекистану.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/catalog" style={{
            background: 'white', color: '#0F4F85', padding: '14px 32px',
            borderRadius: 50, fontSize: 15, fontWeight: 800, display: 'inline-block',
          }}>
            Смотреть каталог →
          </a>
          <a href={TG} target="_blank" rel="noopener" style={{
            background: 'transparent', color: 'white',
            border: '2px solid rgba(255,255,255,0.35)', padding: '14px 32px',
            borderRadius: 50, fontSize: 15, fontWeight: 700, display: 'inline-block',
          }}>
            ✈ Написать в Telegram
          </a>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div style={{ background: 'white', borderBottom: '1px solid #E5EEF8' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '14px 24px',
          display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap',
        }}>
          {[
            ['🏭', 'Производитель'],
            ['🏅', 'ГОСТ'],
            ['🧪', 'pH = 0'],
            ['🚚', 'Весь Узбекистан'],
            ['🧾', 'Безнал для юрлиц'],
          ].map(([icon, label]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 700 }}>
              <span style={{ fontSize: 16 }}>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#1A6FB0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
          Продукция
        </div>
        <div className="sec-h" style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 8 }}>
          Что мы производим
        </div>
        <div style={{ fontSize: 15, color: '#5A7090', marginBottom: 40, lineHeight: 1.6 }}>
          Вся линейка — от стандартной дистилляции до тройной очистки
        </div>

        <div className="prod-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32,
        }}>
          {PRODUCTS.map(p => (
            <a key={p.name} href="/catalog" className="prod-card" style={{
              background: 'white', border: '1px solid #E5EEF8', borderRadius: 16,
              padding: 24, display: 'flex', flexDirection: 'column', gap: 8,
              cursor: 'pointer', textDecoration: 'none', color: 'inherit',
              transition: 'box-shadow 0.2s, border-color 0.2s',
            }}>
              <div style={{ fontSize: 36, marginBottom: 4 }}>{p.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#1A2332' }}>{p.name}</div>
              <div style={{ fontSize: 13, color: '#5A7090', lineHeight: 1.55 }}>{p.desc}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A6FB0', marginTop: 'auto', paddingTop: 8 }}>
                Смотреть товары →
              </div>
            </a>
          ))}
        </div>

        <a href="/catalog" className="catalog-link" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#1A6FB0', color: 'white', padding: '13px 28px',
          borderRadius: 50, fontSize: 14, fontWeight: 800, textDecoration: 'none',
          transition: 'background 0.2s',
        }}>
          Весь каталог с ценами →
        </a>
      </div>

      {/* WHY US */}
      <div style={{ background: 'white', borderTop: '1px solid #E5EEF8', borderBottom: '1px solid #E5EEF8' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#1A6FB0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
            Преимущества
          </div>
          <div className="sec-h" style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 8 }}>
            Почему выбирают AquaDom
          </div>
          <div style={{ fontSize: 15, color: '#5A7090', marginBottom: 40, lineHeight: 1.6 }}>
            Мы не перекупщики — мы производим воду сами
          </div>

          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {WHY.map(w => (
              <div key={w.title} className="why-card" style={{
                background: 'white', border: '1px solid #E5EEF8', borderRadius: 16,
                padding: 24, display: 'flex', gap: 16, transition: 'box-shadow 0.2s',
              }}>
                <div style={{
                  width: 48, height: 48, background: '#E8F4FD', borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                }}>
                  {w.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 5 }}>{w.title}</div>
                  <div style={{ fontSize: 13, color: '#5A7090', lineHeight: 1.55 }}>{w.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div style={{ background: '#F0F6FF', padding: '72px 0 64px', marginTop: 72 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A6FB0', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
                Отзывы покупателей
              </div>
              <div className="sec-h" style={{ fontSize: 30, fontWeight: 900, color: '#0F1E33', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
                Что говорят наши клиенты
              </div>
            </div>
            <a href="https://uzum.uz/ru/shop/distillirovannayavoda" target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: '1px solid #D4E8FA', borderRadius: 50, padding: '8px 18px', textDecoration: 'none', transition: 'box-shadow 0.2s' }} className="uzum-badge">
              <span style={{ color: '#F5A623', fontSize: 16 }}>★</span>
              <span style={{ fontWeight: 800, fontSize: 16, color: '#0F1E33' }}>4.9</span>
              <span style={{ color: '#5A7090', fontSize: 13 }}>на Uzum Market</span>
            </a>
          </div>

          {/* Scrollable track */}
          <div className="reviews-track">
            {REVIEWS.map((r, i) => {
              const initials = r.name === 'Покупатель' ? '?' : r.name[0].toUpperCase()
              const colors = ['#1A6FB0','#0F4F85','#2585CC','#1A5C96','#0D3A6E','#1E7BC4','#0A3260','#1560A0']
              const avatarBg = colors[i % colors.length]
              return (
                <div key={i} className="review-card">
                  {/* Top: avatar + name + stars */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: '50%',
                      background: avatarBg, color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 17, flexShrink: 0,
                    }}>{initials}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: '#0F1E33', lineHeight: 1.2 }}>{r.name}</div>
                      <div style={{ color: '#F5A623', fontSize: 14, letterSpacing: 1 }}>★★★★★</div>
                    </div>
                  </div>
                  {/* Text */}
                  <div style={{ fontSize: 13.5, color: '#2A3F5A', lineHeight: 1.6, flexGrow: 1 }}>
                    &ldquo;{r.text}&rdquo;
                  </div>
                  {/* Footer: product + date */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{
                      background: '#EEF6FF', color: '#1A6FB0', borderRadius: 50,
                      padding: '3px 10px', fontSize: 11, fontWeight: 700,
                    }}>{r.product}</span>
                    <span style={{ fontSize: 11, color: '#8A9BB0' }}>{r.date}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* B2B */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px 0' }}>
        <div className="b2b-inner" style={{
          background: 'linear-gradient(135deg, #0D2547 0%, #1A5C96 100%)',
          borderRadius: 20, padding: '48px', color: 'white',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 32, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontSize: 26, fontWeight: 900, marginBottom: 8, letterSpacing: '-0.5px' }}>
              Для бизнеса — особые условия
            </div>
            <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 18, lineHeight: 1.5 }}>
              Крупные объёмы, оплата по безналу, счёт-фактура.<br/>Персональный менеджер.
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['🔧 СТО', '🏥 Клиники', '🔬 Лаборатории', '👔 Магазины одежды', '🏭 Производства'].map(t => (
                <span key={t} style={{
                  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 50, padding: '5px 14px', fontSize: 12, fontWeight: 600,
                }}>{t}</span>
              ))}
            </div>
          </div>
          <a href={TG} target="_blank" rel="noopener" className="b2b-btn" style={{
            background: 'white', color: '#0F4F85', padding: '14px 26px',
            borderRadius: 50, fontSize: 14, fontWeight: 800,
            textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
            transition: 'background 0.2s',
          }}>
            Обсудить условия →
          </a>
        </div>
      </div>

      {/* REQUEST FORM */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }} id="callback">
        <div style={{ fontSize: 11, fontWeight: 800, color: '#1A6FB0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, textAlign: 'center' }}>
          Обратный звонок
        </div>
        <div className="sec-h" style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 8, textAlign: 'center' }}>
          Оставьте заявку
        </div>
        <div style={{ fontSize: 15, color: '#5A7090', marginBottom: 40, lineHeight: 1.6, textAlign: 'center' }}>
          Менеджер свяжется с вами в течение часа
        </div>

        <div className="form-wrap" style={{
          background: 'white', border: '1px solid #E5EEF8', borderRadius: 20,
          padding: 40, maxWidth: 520, margin: '0 auto',
        }}>
          {success ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div style={{ fontSize: 52, marginBottom: 14 }}>✅</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0F5A38', marginBottom: 8 }}>Заявка принята!</h3>
              <p style={{ fontSize: 14, color: '#1A8F5A', lineHeight: 1.6 }}>
                Наш менеджер свяжется с вами в течение часа.<br/>
                Или напишите сами:{' '}
                <a href={TG} style={{ color: '#1A6FB0', fontWeight: 700 }}>@aquadomm_bot</a>
              </p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#5A7090', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
                  Имя
                </label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Ваше имя"
                  style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #E5EEF8', borderRadius: 12, fontFamily: 'inherit', fontSize: 14, color: '#1A2332', background: '#F7F9FC', outline: 'none', transition: 'border 0.2s' }}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#5A7090', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
                  Телефон
                </label>
                <input
                  value={form.phone}
                  onChange={e => { const v = e.target.value; if (v.startsWith('+998')) setForm({ ...form, phone: v }) }}
                  placeholder="+998 90 000 00 00"
                  type="tel"
                  style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #E5EEF8', borderRadius: 12, fontFamily: 'inherit', fontSize: 14, color: '#1A2332', background: '#F7F9FC', outline: 'none', transition: 'border 0.2s' }}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#5A7090', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>
                  Сообщение <span style={{ fontWeight: 400, opacity: 0.6 }}>(необязательно)</span>
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Какой объём нужен, как часто, есть ли вопросы..."
                  rows={3}
                  style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #E5EEF8', borderRadius: 12, fontFamily: 'inherit', fontSize: 14, color: '#1A2332', background: '#F7F9FC', outline: 'none', transition: 'border 0.2s', resize: 'vertical' }}
                />
              </div>
              {error && (
                <div style={{ fontSize: 13, color: '#D85A30', background: '#FAECE7', padding: '10px 14px', borderRadius: 10, marginBottom: 14 }}>
                  {error}
                </div>
              )}
              <button
                className="sub-btn"
                onClick={submit}
                disabled={loading}
                style={{
                  width: '100%', padding: 15, background: '#1A6FB0', color: 'white',
                  border: 'none', borderRadius: 50, fontFamily: 'inherit', fontSize: 15,
                  fontWeight: 800, cursor: loading ? 'default' : 'pointer',
                  opacity: loading ? 0.7 : 1, transition: 'background 0.2s',
                }}
              >
                {loading ? 'Отправляем...' : 'Отправить заявку →'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#0D2547', color: 'white', padding: '48px 24px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="ft-top" style={{ display: 'flex', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', marginBottom: 40 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>
                <span style={{ fontWeight: 300, opacity: 0.7 }}>Aqua</span>Dom
              </div>
              <div style={{ fontSize: 12, opacity: 0.4, marginTop: 4 }}>Дистиллированная вода для техники</div>
              <div style={{ fontSize: 11, opacity: 0.3, marginTop: 6 }}>Не для питья</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="/" className="ft-link" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', transition: 'color 0.2s' }}>Главная</a>
              <a href="/catalog" className="ft-link" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', transition: 'color 0.2s' }}>Каталог</a>
              <a href="#callback" className="ft-link" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', transition: 'color 0.2s' }}>Оставить заявку</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href={`tel:${PHONE}`} className="ft-contact" style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600, transition: 'color 0.2s' }}>
                📞 {PHONE_DISPLAY}
              </a>
              <a href={TG} target="_blank" rel="noopener" className="ft-contact" style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600, transition: 'color 0.2s' }}>
                ✈ @aquadomm_bot
              </a>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                📍 Ташкент и весь Узбекистан
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, fontSize: 12, opacity: 0.35 }}>
            © 2025 AquaDom — Дистиллированная вода. Только для технических нужд, не для питья.
          </div>
        </div>
      </footer>
    </>
  )
}
