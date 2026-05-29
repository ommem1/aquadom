'use client'
import { useEffect, useState } from 'react'
import { client } from '../../lib/sanity'

const CATS = {
  distilled: 'Дистиллированная вода',
  double: 'Двойная дистилляция',
  triple: 'Тройная дистилляция',
  electrolyte: 'Электролит',
  silver: 'С ионами серебра',
  bulk: 'Оптом',
}

const PHONE = '+998901860128'
const PHONE_DISPLAY = '+998 90 186 01 28'
const TG = 'https://t.me/aquadomm_bot'

function fmt(n) { return n?.toLocaleString('ru') + ' сум' }

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
    if (!form.name || form.phone.length < 9) { setError('Введите имя и номер телефона'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/callback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, product: product.name }) })
      const data = await res.json()
      if (data.success) setSuccess(true)
      else setError('Ошибка. Напишите нам в Telegram.')
    } catch { setError('Ошибка сети. Попробуйте ещё раз.') }
    setLoading(false)
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(10,15,30,0.7)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backdropFilter: 'blur(6px)' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: 24, padding: 32, width: '100%', maxWidth: 440, position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: '#F1F5F9', border: 'none', borderRadius: '50%', width: 34, height: 34, fontSize: 18, cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#065F46', marginBottom: 10 }}>Заявка принята!</h3>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.6, marginBottom: 24 }}>Менеджер свяжется с вами в течение часа.</p>
            <button onClick={onClose} style={{ background: '#1A6FB0', color: 'white', border: 'none', padding: '12px 32px', borderRadius: 50, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Закрыть</button>
          </div>
        ) : (
          <>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, paddingRight: 36, color: '#0A0F1E' }}>Оставить заявку</h3>
            <div style={{ fontSize: 13, color: '#64748B', background: '#F8FAFC', padding: '8px 12px', borderRadius: 10, marginBottom: 24, fontWeight: 500, border: '1px solid #E8EFF8' }}>
              {product.name}
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 7 }}>Имя</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя"/>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 7 }}>Телефон</label>
              <input value={form.phone} onChange={e => { const v = e.target.value; if (v.startsWith('+998')) setForm({ ...form, phone: v }) }} placeholder="+998 90 000 00 00" type="tel"/>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 7 }}>
                Сообщение <span style={{ fontWeight: 400, opacity: 0.6, textTransform: 'none', letterSpacing: 0 }}>(необязательно)</span>
              </label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Объём, количество, вопросы..." rows={3}/>
            </div>
            {error && <div style={{ fontSize: 13, color: '#B91C1C', background: '#FEF2F2', padding: '10px 14px', borderRadius: 10, marginBottom: 14, border: '1px solid #FCA5A5' }}>{error}</div>}
            <button onClick={submit} disabled={loading} style={{ width: '100%', padding: 15, background: '#1A6FB0', color: 'white', border: 'none', borderRadius: 50, fontFamily: 'inherit', fontSize: 15, fontWeight: 700, cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'background 0.2s' }}>
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
    client.fetch(`*[_type == "product"] | order(category, _createdAt) {
      _id, name, category, uzumUrl,
      "slug": slug.current,
      "imageUrl": image.asset->url,
      variants[]{ volume, price, oldPrice, inStock }
    }`).then(data => { setProducts(data); setLoading(false) })
  }, [])

  // Показываем все товары: если variants нет (старый формат) — показываем, если есть — хотя бы один в наличии
  const inStockProducts = products.filter(p =>
    !p.variants?.length || p.variants.some(v => v.inStock !== false)
  )
  const filtered = cat === 'all' ? inStockProducts : inStockProducts.filter(p => p.category === cat)
  const available = ['all', ...Object.keys(CATS).filter(k => inStockProducts.some(p => p.category === k))]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #F8FAFC; color: #0A0F1E; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }

        .hdr-nav a { font-size: 15px; font-weight: 500; color: #4A5568; transition: color 0.15s; }
        .hdr-nav a:hover, .hdr-nav a.active { color: #1A6FB0 !important; }

        .f-btn { font-family: inherit; border: none; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
        .f-btn:hover { background: #EFF6FF !important; color: #1A6FB0 !important; }

        .p-card { background: white; border-radius: 20px; border: 1px solid #E8EFF8; overflow: hidden; display: flex; flex-direction: column; transition: box-shadow 0.2s, transform 0.2s; }
        .p-card:hover { box-shadow: 0 12px 36px rgba(15,28,46,0.10) !important; transform: translateY(-3px); }
        .btn-uzum { display: block; text-align: center; background: #1A6FB0; color: white; border: none; border-radius: 12px; padding: 13px; font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer; transition: background 0.2s; }
        .btn-uzum:hover { background: #0F5090 !important; }
        .btn-req { display: block; text-align: center; background: white; color: #1A6FB0; border: 1.5px solid #BFDBFE; border-radius: 12px; padding: 11px; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .btn-req:hover { background: #EFF6FF !important; border-color: #1A6FB0 !important; }

        input, textarea { width: 100%; padding: 13px 15px; border: 1.5px solid #E2E8F0; border-radius: 12px; font-family: inherit; font-size: 15px; color: #0A0F1E; background: #F8FAFC; outline: none; transition: border-color 0.2s, background 0.2s; }
        input:focus, textarea:focus { border-color: #1A6FB0 !important; background: white !important; }
        textarea { resize: vertical; }

        @media (max-width: 1024px) { .p-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px) { .p-grid { grid-template-columns: repeat(2, 1fr) !important; } .hdr-phone { display: none !important; } }
        @media (max-width: 500px) { .p-grid { grid-template-columns: 1fr !important; } .hdr-nav { display: none !important; } }
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
            <a href="/catalog" className="active">Каталог</a>
            <a href="/b2b">Для бизнеса</a>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href={`tel:${PHONE}`} className="hdr-phone" style={{ fontSize: 15, fontWeight: 600, color: '#0A0F1E' }}>{PHONE_DISPLAY}</a>
            <a href={TG} target="_blank" rel="noopener" style={{ background: '#1A6FB0', color: 'white', padding: '9px 20px', borderRadius: 50, fontSize: 14, fontWeight: 600 }}>Написать →</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#FAFCFF', padding: '52px 28px 44px', borderBottom: '1px solid #E8EFF8' }}>
        <div style={{ position: 'absolute', right: -150, top: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,111,176,0.09) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16, fontWeight: 500 }}>
            <a href="/" style={{ color: '#94A3B8' }}>Главная</a>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#1A6FB0', fontWeight: 600 }}>Каталог</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#0A0F1E', lineHeight: 1.1, marginBottom: 12 }}>
            Каталог продукции
          </h1>
          <p style={{ fontSize: 17, color: '#64748B', lineHeight: 1.6 }}>
            Дистиллированная вода собственного производства · ГОСТ · pH = 0
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ background: 'white', borderBottom: '1px solid #E8EFF8', overflowX: 'auto' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px 28px', display: 'flex', gap: 8, whiteSpace: 'nowrap' }}>
          {available.map(k => (
            <button key={k} className="f-btn" onClick={() => setCat(k)} style={{
              background: cat === k ? '#1A6FB0' : '#F8FAFC',
              border: `1.5px solid ${cat === k ? '#1A6FB0' : '#E2E8F0'}`,
              borderRadius: 50, padding: '9px 20px',
              fontSize: 14, fontWeight: 600,
              color: cat === k ? 'white' : '#4A5568',
            }}>
              {k === 'all' ? `Все (${inStockProducts.length})` : `${CATS[k]} (${inStockProducts.filter(p => p.category === k).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '36px 28px 72px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 24px', color: '#94A3B8', fontSize: 16 }}>Загружаем товары...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>💧</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: '#0A0F1E' }}>Товары скоро появятся</div>
            <div style={{ fontSize: 16, color: '#64748B', marginBottom: 28 }}>Напишите нам в Telegram — поможем с выбором</div>
            <a href={TG} target="_blank" rel="noopener" style={{ display: 'inline-block', background: '#1A6FB0', color: 'white', padding: '14px 32px', borderRadius: 50, fontWeight: 700, fontSize: 15 }}>
              Написать в Telegram →
            </a>
          </div>
        ) : (
          <div className="p-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {filtered.map(p => {
              const variants = p.variants || []
              const prices = variants.map(v => v.price).filter(Boolean)
              const minPrice = prices.length ? Math.min(...prices) : null
              const hasDiscount = variants.some(v => v.oldPrice && v.price < v.oldPrice)
              return (
                <div key={p._id} className="p-card">
                  {/* IMAGE */}
                  <a href={`/catalog/${p.slug || p._id}`} style={{ position: 'relative', background: '#F8FAFC', height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {p.imageUrl
                      ? <img src={p.imageUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 20 }}/>
                      : <span style={{ fontSize: 72 }}>💧</span>
                    }
                    {hasDiscount && (
                      <span style={{ position: 'absolute', top: 12, right: 12, background: '#EF4444', color: 'white', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>Скидка</span>
                    )}
                  </a>

                  {/* BODY */}
                  <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#1A6FB0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {CATS[p.category] || p.category}
                    </div>
                    <a href={`/catalog/${p.slug || p._id}`} style={{ fontSize: 15, fontWeight: 700, color: '#0A0F1E', lineHeight: 1.35 }}>
                      {p.name}
                    </a>

                    {/* Объёмы-чипы */}
                    {variants.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 2 }}>
                        {variants.map(v => (
                          <span key={v.volume} style={{
                            fontSize: 12, fontWeight: 600,
                            padding: '3px 10px', borderRadius: 20,
                            background: v.inStock === false ? '#F1F5F9' : '#EFF6FF',
                            color: v.inStock === false ? '#94A3B8' : '#1A6FB0',
                            textDecoration: v.inStock === false ? 'line-through' : 'none',
                          }}>
                            {v.volume} л
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Цена */}
                    {minPrice != null && (
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
                        <span style={{ fontSize: 13, color: '#94A3B8', fontWeight: 500 }}>от</span>
                        <span style={{ fontSize: 20, fontWeight: 800, color: '#0A0F1E', letterSpacing: '-0.5px' }}>{fmt(minPrice)}</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto', paddingTop: 12 }}>
                      {p.uzumUrl && <a href={p.uzumUrl} target="_blank" rel="noopener" className="btn-uzum">Купить на Uzum →</a>}
                      <button className="btn-req" onClick={() => setModal(p)}>Оставить заявку</button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ background: '#080F1E', color: 'white', padding: '48px 28px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {LOGO}
              <div style={{ fontSize: 18, fontWeight: 800 }}><span style={{ color: '#60A5FA' }}>Aqua</span>Dom</div>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <a href={`tel:${PHONE}`} style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>📞 {PHONE_DISPLAY}</a>
              <a href={TG} target="_blank" rel="noopener" style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>✈ @aquadomm_bot</a>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20, fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>
            © 2025 AquaDom — Не для питья · Только для технических нужд
          </div>
        </div>
      </footer>

      {modal && <Modal product={modal} onClose={() => setModal(null)} />}
    </>
  )
}
