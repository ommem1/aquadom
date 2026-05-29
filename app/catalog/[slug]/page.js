'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { client } from '../../../lib/sanity'

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

export default function ProductPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [form, setForm] = useState({ name: '', phone: '+998', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return
    client.fetch(
      `*[_type == "product" && (slug.current == $slug || _id == $slug)][0] {
        _id, name, category, volume, price, oldPrice, uzumUrl, description, inStock,
        "imageUrl": image.asset->url,
        specs[] { key, value }
      }`,
      { slug }
    ).then(data => { setProduct(data); setLoading(false) })
  }, [slug])

  const submit = async () => {
    if (!form.name || form.phone.length < 9) { setError('Введите имя и номер телефона'); return }
    setSubmitting(true); setError('')
    try {
      const productLabel = [product.name, product.volume ? `${product.volume} л` : null].filter(Boolean).join(', ')
      const res = await fetch('/api/callback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, product: productLabel, quantity: qty }) })
      const data = await res.json()
      if (data.success) setSubmitted(true)
      else setError('Ошибка. Напишите нам в Telegram.')
    } catch { setError('Ошибка сети. Попробуйте ещё раз.') }
    setSubmitting(false)
  }

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

        .qty-btn { width: 44px; height: 44px; border: 1.5px solid #E2E8F0; border-radius: 12px; background: white; font-size: 20px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; color: #0A0F1E; font-family: inherit; }
        .qty-btn:hover { border-color: #1A6FB0 !important; background: #EFF6FF !important; color: #1A6FB0 !important; }
        .btn-uzum:hover { background: #0F5090 !important; }
        .sub-btn:hover:not(:disabled) { background: #0F5090 !important; }

        input, textarea { width: 100%; padding: 13px 15px; border: 1.5px solid #E2E8F0; border-radius: 12px; font-family: inherit; font-size: 15px; color: #0A0F1E; background: #F8FAFC; outline: none; transition: border-color 0.2s, background 0.2s; }
        input:focus, textarea:focus { border-color: #1A6FB0 !important; background: white !important; }

        @media (max-width: 768px) {
          .product-layout { flex-direction: column !important; }
          .product-image-col { max-width: 100% !important; width: 100% !important; flex: none !important; }
          .desc-grid { grid-template-columns: 1fr !important; }
          .hdr-phone { display: none !important; }
          .form-2col { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
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
            <a href="/catalog" className="active">Каталог</a>
            <a href="/b2b">Для бизнеса</a>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href={`tel:${PHONE}`} className="hdr-phone" style={{ fontSize: 15, fontWeight: 600, color: '#0A0F1E' }}>{PHONE_DISPLAY}</a>
            <a href={TG} target="_blank" rel="noopener" style={{ background: '#1A6FB0', color: 'white', padding: '9px 20px', borderRadius: 50, fontSize: 14, fontWeight: 600 }}>Написать →</a>
          </div>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div style={{ background: 'white', borderBottom: '1px solid #E8EFF8' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '13px 28px', fontSize: 13, color: '#94A3B8', fontWeight: 500 }}>
          <a href="/" style={{ color: '#94A3B8' }}>Главная</a>
          <span style={{ margin: '0 8px' }}>/</span>
          <a href="/catalog" style={{ color: '#94A3B8' }}>Каталог</a>
          {product && <><span style={{ margin: '0 8px' }}>/</span><span style={{ color: '#64748B' }}>{product.name}</span></>}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 28px 72px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 80, color: '#94A3B8', fontSize: 16 }}>Загружаем...</div>
        ) : !product ? (
          <div style={{ textAlign: 'center', padding: 80 }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Товар не найден</div>
            <a href="/catalog" style={{ color: '#1A6FB0', fontWeight: 700, fontSize: 15 }}>← Вернуться в каталог</a>
          </div>
        ) : (
          <>
            {/* MAIN LAYOUT */}
            <div className="product-layout" style={{ display: 'flex', gap: 52, alignItems: 'flex-start' }}>

              {/* IMAGE COL */}
              <div className="product-image-col" style={{ flex: '0 0 440px', maxWidth: 440 }}>
                <div style={{ background: 'white', borderRadius: 24, border: '1px solid #E8EFF8', overflow: 'hidden', position: 'relative' }}>
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'contain', padding: 36, display: 'block' }}/>
                  ) : (
                    <div style={{ width: '100%', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 96 }}>💧</div>
                  )}
                  {!product.inStock && (
                    <div style={{ position: 'absolute', top: 16, left: 16, background: '#94A3B8', color: 'white', borderRadius: 20, padding: '5px 14px', fontSize: 13, fontWeight: 600 }}>Нет в наличии</div>
                  )}
                </div>
                {/* Trust badges */}
                <div style={{ marginTop: 14, background: '#EFF6FF', borderRadius: 16, padding: '14px 18px', display: 'flex', gap: 20, flexWrap: 'wrap', border: '1px solid #BFDBFE' }}>
                  {[['🏅', 'ГОСТ'], ['🧪', 'pH = 0'], ['🏭', 'Производитель']].map(([icon, label]) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#1A6FB0' }}>
                      {icon} {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* INFO COL */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1A6FB0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                  {CATS[product.category] || product.category}
                </div>
                <h1 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 10, color: '#0A0F1E' }}>
                  {product.name}
                </h1>
                {product.volume && (
                  <div style={{ fontSize: 15, color: '#64748B', marginBottom: 24, fontWeight: 500 }}>Объём: {product.volume} л</div>
                )}

                {/* PRICE */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 32 }}>
                  <span style={{ fontSize: 40, fontWeight: 900, color: '#0A0F1E', letterSpacing: '-1.5px' }}>{fmt(product.price)}</span>
                  {product.oldPrice && (
                    <>
                      <span style={{ fontSize: 20, color: '#CBD5E1', textDecoration: 'line-through', fontWeight: 500 }}>{fmt(product.oldPrice)}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, background: '#DCFCE7', color: '#16A34A', padding: '4px 12px', borderRadius: 20 }}>
                        −{Math.round((1 - product.price / product.oldPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>

                {/* QUANTITY */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>Количество</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                    <span style={{ fontSize: 22, fontWeight: 800, minWidth: 36, textAlign: 'center', color: '#0A0F1E' }}>{qty}</span>
                    <button className="qty-btn" onClick={() => setQty(q => Math.min(100, q + 1))}>+</button>
                    {product.volume && (
                      <span style={{ fontSize: 14, color: '#64748B' }}>
                        = {(qty * product.volume % 1 === 0 ? qty * product.volume : (qty * product.volume).toFixed(1))} л
                      </span>
                    )}
                    <span style={{ fontSize: 17, fontWeight: 800, color: '#1A6FB0', marginLeft: 4 }}>
                      {fmt(product.price * qty)}
                    </span>
                  </div>
                </div>

                {/* UZUM */}
                {product.uzumUrl && (
                  <a href={product.uzumUrl} target="_blank" rel="noopener" className="btn-uzum" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    background: '#1A6FB0', color: 'white', borderRadius: 16,
                    padding: '16px 24px', fontSize: 16, fontWeight: 700,
                    textDecoration: 'none', marginBottom: 14, transition: 'background 0.2s',
                  }}>
                    <span>Купить на</span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '2px 10px', fontSize: 15, fontWeight: 800 }}>Uzum</span>
                    <span>→</span>
                  </a>
                )}

                {/* FORM */}
                <div style={{ background: 'white', border: '1px solid #E8EFF8', borderRadius: 20, padding: 24 }}>
                  {submitted ? (
                    <div style={{ textAlign: 'center', padding: '16px 0' }}>
                      <div style={{ fontSize: 44, marginBottom: 12 }}>✅</div>
                      <div style={{ fontSize: 19, fontWeight: 800, color: '#065F46', marginBottom: 8 }}>Заявка принята!</div>
                      <div style={{ fontSize: 14, color: '#64748B' }}>Менеджер свяжется с вами в течение часа.</div>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 18, color: '#0A0F1E' }}>
                        Оставить заявку{qty > 1 ? ` на ${qty} шт.` : ''}
                      </div>
                      <div className="form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 7 }}>Имя</label>
                          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ваше имя"/>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 7 }}>Телефон</label>
                          <input value={form.phone} onChange={e => { const v = e.target.value; if (v.startsWith('+998')) setForm({ ...form, phone: v }) }} placeholder="+998 90 000 00 00" type="tel"/>
                        </div>
                      </div>
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 7 }}>
                          Сообщение <span style={{ fontWeight: 400, opacity: 0.6, textTransform: 'none', letterSpacing: 0 }}>(необязательно)</span>
                        </label>
                        <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Адрес доставки, вопросы..." rows={2} style={{ resize: 'none' }}/>
                      </div>
                      {error && <div style={{ fontSize: 13, color: '#B91C1C', background: '#FEF2F2', padding: '10px 14px', borderRadius: 10, marginBottom: 12, border: '1px solid #FCA5A5' }}>{error}</div>}
                      <button className="sub-btn" onClick={submit} disabled={submitting || !product.inStock} style={{
                        width: '100%', padding: 14, background: product.inStock ? '#1A6FB0' : '#94A3B8',
                        color: 'white', border: 'none', borderRadius: 50, fontFamily: 'inherit',
                        fontSize: 15, fontWeight: 700, cursor: submitting || !product.inStock ? 'default' : 'pointer',
                        opacity: submitting ? 0.7 : 1, transition: 'background 0.2s',
                      }}>
                        {submitting ? 'Отправляем...' : !product.inStock ? 'Нет в наличии' : 'Отправить заявку →'}
                      </button>
                    </>
                  )}
                </div>

                <div style={{ display: 'flex', gap: 20, marginTop: 16, flexWrap: 'wrap' }}>
                  <a href={TG} target="_blank" rel="noopener" style={{ fontSize: 14, color: '#1A6FB0', fontWeight: 600 }}>✈ Написать в Telegram</a>
                  <a href={`tel:${PHONE}`} style={{ fontSize: 14, color: '#1A6FB0', fontWeight: 600 }}>📞 {PHONE_DISPLAY}</a>
                </div>
              </div>
            </div>

            {/* DESCRIPTION + SPECS */}
            {(product.description || product.specs?.length > 0) && (
              <div style={{ marginTop: 52, display: 'grid', gridTemplateColumns: product.specs?.length > 0 ? '1fr 1fr' : '1fr', gap: 20 }} className="desc-grid">
                {product.description && (
                  <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E8EFF8', padding: 32 }}>
                    <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 16, color: '#0A0F1E' }}>Описание</div>
                    <div style={{ fontSize: 15, color: '#64748B', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{product.description}</div>
                  </div>
                )}
                {product.specs?.length > 0 && (
                  <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E8EFF8', padding: 32 }}>
                    <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 16, color: '#0A0F1E' }}>Характеристики</div>
                    {product.specs.map((s, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '12px 0', borderBottom: i < product.specs.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                        <span style={{ fontSize: 14, color: '#64748B', fontWeight: 500 }}>{s.key}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', color: '#0A0F1E' }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div style={{ marginTop: 40 }}>
              <a href="/catalog" style={{ fontSize: 15, color: '#1A6FB0', fontWeight: 600 }}>← Вернуться в каталог</a>
            </div>
          </>
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
    </>
  )
}
