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

function fmt(n) {
  return n?.toLocaleString('ru') + ' сум'
}

function Header() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white', borderBottom: '1px solid #E5EEF8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
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
        <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="/" style={{ fontSize: 14, fontWeight: 600, color: '#5A7090', textDecoration: 'none' }}>Главная</a>
          <a href="/catalog" style={{ fontSize: 14, fontWeight: 600, color: '#1A6FB0', textDecoration: 'none' }}>Каталог</a>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href={`tel:${PHONE}`} style={{ fontSize: 14, fontWeight: 700, color: '#1A2332', textDecoration: 'none' }} className="hdr-phone">
            {PHONE_DISPLAY}
          </a>
          <a href={TG} target="_blank" rel="noopener" style={{ background: '#1A6FB0', color: 'white', padding: '9px 20px', borderRadius: 50, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
            Telegram
          </a>
        </div>
      </div>
    </header>
  )
}

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
    client.fetch(
      `*[_type == "product" && slug.current == $slug][0] {
        _id, name, category, volume, price, oldPrice, uzumUrl, description, inStock,
        "imageUrl": image.asset->url,
        specs[] { key, value }
      }`,
      { slug }
    ).then(data => {
      setProduct(data)
      setLoading(false)
    })
  }, [slug])

  const submit = async () => {
    if (!form.name || form.phone.length < 9) {
      setError('Введите имя и номер телефона')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const productLabel = [
        product.name,
        product.volume ? `${product.volume} л` : null,
      ].filter(Boolean).join(', ')

      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, product: productLabel, quantity: qty }),
      })
      const data = await res.json()
      if (data.success) setSubmitted(true)
      else setError('Ошибка. Напишите нам в Telegram.')
    } catch {
      setError('Ошибка сети. Попробуйте ещё раз.')
    }
    setSubmitting(false)
  }

  const inputStyle = {
    width: '100%', padding: '12px 14px', border: '1.5px solid #E5EEF8',
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
        .qty-btn:hover { background: #E8F4FD !important; border-color: #1A6FB0 !important; }
        .btn-uzum:hover { background: #0F4F85 !important; }
        .sub-btn:hover:not(:disabled) { background: #0F4F85 !important; }
        @media (max-width: 768px) {
          .product-layout { flex-direction: column !important; }
          .product-image-col { max-width: 100% !important; }
          .hdr-phone { display: none !important; }
        }
        @media (max-width: 480px) {
          .product-wrap { padding: 16px !important; }
        }
      `}</style>

      <Header />

      {/* BREADCRUMB */}
      <div style={{ background: 'white', borderBottom: '1px solid #E5EEF8' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '12px 24px', fontSize: 13, color: '#5A7090' }}>
          <a href="/" style={{ color: '#5A7090' }}>Главная</a>
          {' / '}
          <a href="/catalog" style={{ color: '#5A7090' }}>Каталог</a>
          {product && <span> / {product.name}</span>}
        </div>
      </div>

      <div className="product-wrap" style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 64px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 80, color: '#5A7090', fontSize: 16 }}>Загружаем...</div>
        ) : !product ? (
          <div style={{ textAlign: 'center', padding: 80 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Товар не найден</div>
            <a href="/catalog" style={{ color: '#1A6FB0', fontWeight: 700 }}>← Вернуться в каталог</a>
          </div>
        ) : (
          <>
            {/* MAIN LAYOUT */}
            <div className="product-layout" style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>

              {/* IMAGE */}
              <div className="product-image-col" style={{ flex: '0 0 420px', maxWidth: 420 }}>
                <div style={{
                  background: 'white', borderRadius: 20, border: '1px solid #E5EEF8',
                  overflow: 'hidden', position: 'relative',
                }}>
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{ width: '100%', aspectRatio: '1/1', objectFit: 'contain', padding: 32, display: 'block' }}
                    />
                  ) : (
                    <div style={{
                      width: '100%', aspectRatio: '1/1',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 96,
                    }}>💧</div>
                  )}
                  {!product.inStock && (
                    <div style={{
                      position: 'absolute', top: 16, left: 16,
                      background: '#B0C0D0', color: 'white', borderRadius: 20,
                      padding: '4px 12px', fontSize: 12, fontWeight: 700,
                    }}>Нет в наличии</div>
                  )}
                </div>

                {/* GOST badge under image */}
                <div style={{
                  marginTop: 12, background: '#E8F4FD', borderRadius: 12,
                  padding: '12px 16px', display: 'flex', gap: 16, flexWrap: 'wrap',
                }}>
                  {[['🏅', 'ГОСТ'], ['🧪', 'pH = 0'], ['🏭', 'Производитель']].map(([icon, label]) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#1A6FB0' }}>
                      {icon} {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* INFO */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Category */}
                <div style={{ fontSize: 11, fontWeight: 800, color: '#1A6FB0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  {CATS[product.category] || product.category}
                </div>

                {/* Name */}
                <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 8 }}>
                  {product.name}
                </h1>

                {/* Volume */}
                {product.volume && (
                  <div style={{ fontSize: 14, color: '#5A7090', marginBottom: 20 }}>
                    Объём: {product.volume} л
                  </div>
                )}

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 28 }}>
                  <span style={{ fontSize: 36, fontWeight: 900, color: '#0F4F85' }}>{fmt(product.price)}</span>
                  {product.oldPrice && (
                    <>
                      <span style={{ fontSize: 18, color: '#B0C0D0', textDecoration: 'line-through' }}>{fmt(product.oldPrice)}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, background: '#E6F7EE', color: '#1A8F5A', padding: '3px 10px', borderRadius: 20 }}>
                        −{Math.round((1 - product.price / product.oldPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>

                {/* QUANTITY */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#5A7090', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
                    Количество
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                      className="qty-btn"
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      style={{
                        width: 40, height: 40, border: '2px solid #E5EEF8', borderRadius: 10,
                        background: 'white', fontSize: 20, fontWeight: 700, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.15s', color: '#1A2332',
                      }}
                    >−</button>
                    <span style={{ fontSize: 22, fontWeight: 800, minWidth: 36, textAlign: 'center' }}>{qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => setQty(q => Math.min(100, q + 1))}
                      style={{
                        width: 40, height: 40, border: '2px solid #E5EEF8', borderRadius: 10,
                        background: 'white', fontSize: 20, fontWeight: 700, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.15s', color: '#1A2332',
                      }}
                    >+</button>
                    {product.volume && (
                      <span style={{ fontSize: 13, color: '#5A7090' }}>
                        = {(qty * product.volume % 1 === 0 ? qty * product.volume : (qty * product.volume).toFixed(1))} л
                      </span>
                    )}
                    <span style={{ fontSize: 15, fontWeight: 800, color: '#0F4F85', marginLeft: 4 }}>
                      {fmt(product.price * qty)}
                    </span>
                  </div>
                </div>

                {/* UZUM BUTTON */}
                {product.uzumUrl && (
                  <a
                    href={product.uzumUrl}
                    target="_blank"
                    rel="noopener"
                    className="btn-uzum"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      background: '#1A6FB0', color: 'white', borderRadius: 14,
                      padding: '16px 24px', fontSize: 16, fontWeight: 800,
                      textDecoration: 'none', marginBottom: 12, transition: 'background 0.2s',
                    }}
                  >
                    <span>Купить на</span>
                    <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 6, padding: '2px 8px', fontSize: 14, fontWeight: 800 }}>Uzum</span>
                    <span>→</span>
                  </a>
                )}

                {/* ORDER FORM */}
                <div style={{ background: 'white', border: '1px solid #E5EEF8', borderRadius: 16, padding: 24 }}>
                  {submitted ? (
                    <div style={{ textAlign: 'center', padding: '12px 0' }}>
                      <div style={{ fontSize: 40, marginBottom: 10 }}>✅</div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#0F5A38', marginBottom: 6 }}>Заявка принята!</div>
                      <div style={{ fontSize: 13, color: '#1A8F5A' }}>Менеджер свяжется с вами в течение часа.</div>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 16, color: '#1A2332' }}>
                        Оставить заявку на {qty > 1 ? `${qty} шт.` : 'товар'}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#5A7090', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>Имя</label>
                          <input
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="Ваше имя"
                            style={inputStyle}
                          />
                        </div>
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
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: '#5A7090', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>
                          Сообщение <span style={{ fontWeight: 400, opacity: 0.6 }}>(необязательно)</span>
                        </label>
                        <textarea
                          value={form.message}
                          onChange={e => setForm({ ...form, message: e.target.value })}
                          placeholder="Адрес доставки, вопросы по товару..."
                          rows={2}
                          style={{ ...inputStyle, resize: 'none' }}
                        />
                      </div>
                      {error && (
                        <div style={{ fontSize: 13, color: '#D85A30', background: '#FAECE7', padding: '10px 14px', borderRadius: 10, marginBottom: 10 }}>
                          {error}
                        </div>
                      )}
                      <button
                        className="sub-btn"
                        onClick={submit}
                        disabled={submitting || !product.inStock}
                        style={{
                          width: '100%', padding: 14, background: product.inStock ? '#1A6FB0' : '#B0C8E0',
                          color: 'white', border: 'none', borderRadius: 50, fontFamily: 'inherit',
                          fontSize: 15, fontWeight: 800, cursor: submitting || !product.inStock ? 'default' : 'pointer',
                          opacity: submitting ? 0.7 : 1, transition: 'background 0.2s',
                        }}
                      >
                        {submitting ? 'Отправляем...' : !product.inStock ? 'Нет в наличии' : 'Отправить заявку →'}
                      </button>
                    </>
                  )}
                </div>

                {/* Contact links */}
                <div style={{ display: 'flex', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
                  <a href={TG} target="_blank" rel="noopener" style={{ fontSize: 13, color: '#1A6FB0', fontWeight: 700 }}>
                    ✈ Написать в Telegram
                  </a>
                  <a href={`tel:${PHONE}`} style={{ fontSize: 13, color: '#1A6FB0', fontWeight: 700 }}>
                    📞 {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </div>

            {/* DESCRIPTION + SPECS */}
            {(product.description || (product.specs && product.specs.length > 0)) && (
              <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: product.specs?.length > 0 ? '1fr 1fr' : '1fr', gap: 24 }} className="desc-grid">
                {product.description && (
                  <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E5EEF8', padding: 28 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 14 }}>Описание</div>
                    <div style={{ fontSize: 14, color: '#5A7090', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                      {product.description}
                    </div>
                  </div>
                )}

                {product.specs && product.specs.length > 0 && (
                  <div style={{ background: 'white', borderRadius: 16, border: '1px solid #E5EEF8', padding: 28 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 14 }}>Характеристики</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                      {product.specs.map((s, i) => (
                        <div key={i} style={{
                          display: 'flex', justifyContent: 'space-between', gap: 16,
                          padding: '10px 0',
                          borderBottom: i < product.specs.length - 1 ? '1px solid #F0F5FB' : 'none',
                        }}>
                          <span style={{ fontSize: 13, color: '#5A7090', fontWeight: 600 }}>{s.key}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, textAlign: 'right' }}>{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* BACK LINK */}
            <div style={{ marginTop: 40 }}>
              <a href="/catalog" style={{ fontSize: 14, color: '#1A6FB0', fontWeight: 700 }}>
                ← Вернуться в каталог
              </a>
            </div>
          </>
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
    </>
  )
}
