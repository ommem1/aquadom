'use client'
import { useEffect, useState } from 'react'
import { client } from '../../lib/sanity'

const CATS = {
  distilled: 'Дистиллированная вода',
  double: 'Двойная дистилляция',
  triple: 'Тройная дистилляция',
  electrolyte: 'Электролит',
  silver: 'Вода с ионами серебра',
  bulk: 'Оптом',
}

const PHONE = '+998901860128'
const PHONE_DISPLAY = '+998 90 186 01 28'
const TG = 'https://t.me/aquadomm_bot'

function fmt(n) {
  return n?.toLocaleString('ru') + ' сум'
}

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
          <a href="/" style={{ fontSize: 14, fontWeight: 600, color: '#5A7090', textDecoration: 'none' }}>Главная</a>
          <a href="/catalog" style={{ fontSize: 14, fontWeight: 600, color: '#1A6FB0', textDecoration: 'none' }}>Каталог</a>
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

function Modal({ product, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '+998', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

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
        body: JSON.stringify({ ...form, product: product.name }),
      })
      const data = await res.json()
      if (data.success) setSuccess(true)
      else setError('Ошибка. Напишите нам в Telegram.')
    } catch {
      setError('Ошибка сети. Попробуйте ещё раз.')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', border: '1.5px solid #E5EEF8',
    borderRadius: 12, fontFamily: 'inherit', fontSize: 14, color: '#1A2332',
    background: '#F7F9FC', outline: 'none', transition: 'border 0.2s',
  }
  const labelStyle = {
    display: 'block', fontSize: 11, fontWeight: 800, color: '#5A7090',
    textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6,
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(10,20,40,0.65)',
        zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white', borderRadius: 20, padding: 32,
          width: '100%', maxWidth: 440, position: 'relative',
          maxHeight: '90vh', overflowY: 'auto',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14,
            background: '#F7F9FC', border: 'none', borderRadius: '50%',
            width: 32, height: 32, fontSize: 18, cursor: 'pointer',
            color: '#5A7090', display: 'flex', alignItems: 'center', justifyContent: 'center',
            lineHeight: 1,
          }}
        >×</button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: 52, marginBottom: 14 }}>✅</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0F5A38', marginBottom: 8 }}>Заявка принята!</h3>
            <p style={{ fontSize: 14, color: '#1A8F5A', lineHeight: 1.6, marginBottom: 20 }}>
              Менеджер свяжется с вами в течение часа.
            </p>
            <button
              onClick={onClose}
              style={{
                background: '#1A6FB0', color: 'white', border: 'none',
                padding: '12px 28px', borderRadius: 50, fontFamily: 'inherit',
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
              }}
            >Закрыть</button>
          </div>
        ) : (
          <>
            <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 4, paddingRight: 32 }}>Оставить заявку</h3>
            <div style={{
              fontSize: 13, color: '#5A7090', background: '#F7F9FC',
              padding: '8px 12px', borderRadius: 8, marginBottom: 22, fontWeight: 600,
            }}>
              Товар: {product.name}
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Имя</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Ваше имя"
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Телефон</label>
              <input
                value={form.phone}
                onChange={e => { const v = e.target.value; if (v.startsWith('+998')) setForm({ ...form, phone: v }) }}
                placeholder="+998 90 000 00 00"
                type="tel"
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>
                Сообщение <span style={{ fontWeight: 400, opacity: 0.6 }}>(необязательно)</span>
              </label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Объём, количество, вопросы..."
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
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
  )
}

export default function CatalogPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState('all')
  const [modal, setModal] = useState(null)

  useEffect(() => {
    client.fetch(`*[_type == "product" && inStock == true] | order(category, volume) {
      _id, name, category, volume, price, oldPrice, uzumUrl, description,
      "slug": slug.current,
      "imageUrl": image.asset->url
    }`).then(data => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const filtered = cat === 'all' ? products : products.filter(p => p.category === cat)
  const available = ['all', ...Object.keys(CATS).filter(k => products.some(p => p.category === k))]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Nunito', -apple-system, sans-serif; background: #F7F9FC; color: #1A2332; }
        a { text-decoration: none; }

        .hdr-nav a:hover { color: #1A6FB0 !important; }
        .f-btn:hover { border-color: #1A6FB0 !important; color: #1A6FB0 !important; }
        .p-card:hover { box-shadow: 0 10px 32px rgba(15,28,46,0.12) !important; }
        .btn-uzum:hover { background: #0F4F85 !important; }
        .btn-req:hover { border-color: #1A6FB0 !important; background: #E8F4FD !important; }
        input:focus, textarea:focus { border-color: #1A6FB0 !important; background: white !important; }

        @media (max-width: 900px) {
          .p-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .p-grid { grid-template-columns: 1fr !important; }
          .cat-hero h1 { font-size: 24px !important; }
          .hdr-phone { display: none !important; }
          .hdr-nav { display: none !important; }
        }
      `}</style>

      <Header />

      {/* CATEGORY HERO */}
      <div className="cat-hero" style={{
        background: 'linear-gradient(135deg, #0D2547 0%, #1A6FB0 100%)',
        padding: '40px 24px', color: 'white',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 6, fontWeight: 600 }}>
            <a href="/" style={{ color: 'white', opacity: 0.6 }}>Главная</a> / Каталог
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', marginBottom: 4 }}>
            Каталог продукции
          </h1>
          <p style={{ fontSize: 15, opacity: 0.7 }}>
            Дистиллированная вода собственного производства · ГОСТ · pH = 0
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ background: 'white', borderBottom: '1px solid #E5EEF8', overflowX: 'auto' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 24px', display: 'flex', gap: 8, whiteSpace: 'nowrap' }}>
          {available.map(k => (
            <button
              key={k}
              className="f-btn"
              onClick={() => setCat(k)}
              style={{
                background: cat === k ? '#1A6FB0' : 'white',
                border: `2px solid ${cat === k ? '#1A6FB0' : '#E5EEF8'}`,
                borderRadius: 50,
                padding: '8px 18px',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 700,
                color: cat === k ? 'white' : '#5A7090',
                cursor: 'pointer',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {k === 'all'
                ? `Все (${products.length})`
                : `${CATS[k]} (${products.filter(p => p.category === k).length})`
              }
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 64px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: '#5A7090', fontSize: 16 }}>
            Загружаем товары...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>💧</div>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Товары скоро появятся</div>
            <div style={{ fontSize: 14, color: '#5A7090', marginBottom: 24 }}>
              Напишите нам в Telegram — поможем с выбором
            </div>
            <a
              href={TG}
              target="_blank"
              rel="noopener"
              style={{
                display: 'inline-block', background: '#1A6FB0', color: 'white',
                padding: '13px 28px', borderRadius: 50, fontWeight: 700, fontSize: 14,
              }}
            >
              Написать в Telegram
            </a>
          </div>
        ) : (
          <div
            className="p-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            {filtered.map(p => {
              const disc = p.oldPrice && p.price < p.oldPrice
                ? Math.round((1 - p.price / p.oldPrice) * 100)
                : 0

              return (
                <div
                  key={p._id}
                  className="p-card"
                  style={{
                    background: 'white', borderRadius: 16,
                    border: '1px solid #E5EEF8', overflow: 'hidden',
                    transition: 'box-shadow 0.2s',
                    display: 'flex', flexDirection: 'column',
                  }}
                >
                  {/* IMAGE — clickable */}
                  <a href={p.slug ? `/catalog/${p.slug}` : '#'} style={{
                    position: 'relative', background: '#F7F9FC',
                    height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', textDecoration: 'none',
                  }}>
                    {p.imageUrl
                      ? <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 16 }} />
                      : <span style={{ fontSize: 64 }}>💧</span>
                    }
                    {disc > 0 && (
                      <span style={{
                        position: 'absolute', top: 10, right: 10,
                        background: '#D85A30', color: 'white',
                        fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20,
                      }}>−{disc}%</span>
                    )}
                  </a>

                  {/* BODY */}
                  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#1A6FB0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {CATS[p.category] || p.category}
                    </div>
                    <a href={p.slug ? `/catalog/${p.slug}` : '#'} style={{ fontSize: 15, fontWeight: 800, color: '#1A2332', lineHeight: 1.3, textDecoration: 'none' }}>
                      {p.name}
                    </a>
                    {p.volume && (
                      <div style={{ fontSize: 12, color: '#5A7090' }}>{p.volume} л</div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
                      <span style={{ fontSize: 20, fontWeight: 900, color: '#0F4F85' }}>{fmt(p.price)}</span>
                      {p.oldPrice && (
                        <span style={{ fontSize: 13, color: '#B0C0D0', textDecoration: 'line-through' }}>{fmt(p.oldPrice)}</span>
                      )}
                    </div>

                    {/* ACTIONS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto', paddingTop: 8 }}>
                      {p.uzumUrl && (
                        <a
                          href={p.uzumUrl}
                          target="_blank"
                          rel="noopener"
                          className="btn-uzum"
                          style={{
                            background: '#1A6FB0', color: 'white', border: 'none',
                            borderRadius: 10, padding: 11, fontFamily: 'inherit',
                            fontSize: 13, fontWeight: 700, cursor: 'pointer',
                            textAlign: 'center', display: 'block', transition: 'background 0.2s',
                          }}
                        >
                          Купить на Uzum →
                        </a>
                      )}
                      <button
                        className="btn-req"
                        onClick={() => setModal(p)}
                        style={{
                          background: 'white', color: '#1A6FB0',
                          border: '2px solid #BEDAF5', borderRadius: 10, padding: 9,
                          fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
                          cursor: 'pointer', transition: 'all 0.2s',
                        }}
                      >
                        Оставить заявку
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#0D2547', color: 'white', padding: '40px 24px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>
              <span style={{ fontWeight: 300, opacity: 0.7 }}>Aqua</span>Dom
            </div>
            <div style={{ fontSize: 11, opacity: 0.35, marginTop: 4 }}>Не для питья</div>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <a href={`tel:${PHONE}`} style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>📞 {PHONE_DISPLAY}</a>
            <a href={TG} target="_blank" rel="noopener" style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>✈ @aquadomm_bot</a>
          </div>
        </div>
      </footer>

      {modal && <Modal product={modal} onClose={() => setModal(null)} />}
    </>
  )
}
