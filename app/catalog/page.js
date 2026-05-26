'use client'
import { useEffect, useState } from 'react'
import { client } from '../../lib/sanity'

const CATEGORIES = {
  distilled: 'Дистиллированная вода',
  double: 'Двойная дистилляция',
  triple: 'Тройная дистилляция',
  electrolyte: 'Электролит',
  silver: 'Вода с ионами серебра',
  bulk: 'Оптом',
}

function fmt(n) { return n?.toLocaleString('ru') + ' сум' }

export default function CatalogPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    client.fetch(`*[_type == "product" && inStock == true] | order(category, volume) {
      _id, name, category, volume, price, oldPrice, description,
      "imageUrl": image.asset->url
    }`).then(data => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  const categories = ['all', ...Object.keys(CATEGORIES).filter(k =>
    products.some(p => p.category === k)
  )]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Nunito',sans-serif;background:#F7F9FC;color:#1A2332;}
        .nav{background:#fff;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #E5EEF8;position:sticky;top:0;z-index:100;}
        .logo{display:flex;align-items:center;gap:9px;font-size:19px;font-weight:800;color:#0F4F85;text-decoration:none;}
        .nav-links{display:flex;gap:20px;align-items:center;}
        .nav-link{font-size:14px;font-weight:600;color:#5A7090;text-decoration:none;}
        .nav-link:hover{color:#1A6FB0;}
        .nav-cta{background:#1A6FB0;color:white;border:none;padding:8px 18px;border-radius:50px;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;text-decoration:none;}
        .hero{background:linear-gradient(135deg,#0D2547,#1A6FB0);padding:40px 24px;text-align:center;color:white;}
        .hero h1{font-size:32px;font-weight:800;margin-bottom:8px;letter-spacing:-1px;}
        .hero p{font-size:15px;opacity:0.7;}
        .cats{padding:20px 24px;display:flex;gap:10px;flex-wrap:wrap;max-width:1100px;margin:0 auto;}
        .cat{background:#fff;border:2px solid #E5EEF8;border-radius:50px;padding:8px 18px;font-size:13px;font-weight:700;cursor:pointer;color:#5A7090;transition:all 0.15s;}
        .cat:hover{border-color:#1A6FB0;color:#1A6FB0;}
        .cat.active{background:#1A6FB0;border-color:#1A6FB0;color:white;}
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px;padding:0 24px 40px;max-width:1100px;margin:0 auto;}
        .card{background:#fff;border-radius:16px;border:1px solid #E5EEF8;overflow:hidden;box-shadow:0 2px 8px rgba(15,28,46,0.05);transition:box-shadow 0.2s;}
        .card:hover{box-shadow:0 8px 24px rgba(15,28,46,0.1);}
        .card-img{width:100%;height:180px;object-fit:contain;padding:16px;background:#F7F9FC;}
        .card-img-placeholder{width:100%;height:180px;display:flex;align-items:center;justify-content:center;font-size:48px;background:#F7F9FC;}
        .card-body{padding:16px;}
        .card-cat{font-size:10px;font-weight:800;color:#1A6FB0;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;}
        .card-name{font-size:14px;font-weight:700;margin-bottom:8px;line-height:1.4;color:#1A2332;}
        .card-vol{font-size:12px;color:#5A7090;margin-bottom:10px;}
        .card-prices{display:flex;align-items:center;gap:8px;margin-bottom:12px;}
        .card-price{font-size:18px;font-weight:800;color:#0F4F85;}
        .card-old{font-size:12px;color:#B0C0D0;text-decoration:line-through;}
        .card-discount{font-size:11px;font-weight:800;background:#E6F7EE;color:#1A8F5A;padding:2px 8px;border-radius:20px;}
        .card-btn{width:100%;padding:10px;background:#1A6FB0;color:white;border:none;border-radius:10px;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;}
        .card-btn:hover{background:#0F4F85;}
        .loading{text-align:center;padding:60px;color:#5A7090;font-size:16px;}
        .empty{text-align:center;padding:60px;color:#5A7090;}
        @media(max-width:480px){
          .grid{grid-template-columns:1fr 1fr;gap:10px;padding:0 12px 32px;}
          .hero h1{font-size:24px;}
          .cats{padding:16px 12px;}
        }
      `}</style>

      <nav className="nav">
        <a href="/" className="logo">
          <svg width="28" height="30" viewBox="0 0 84 90" fill="none">
            <path d="M42 5C20 27 8 49 8 63C8 77 24 90 42 90C60 90 76 77 76 63C76 49 64 27 42 5Z" fill="#1A6FB0"/>
            <polygon points="28,57 42,42 56,57" fill="white"/>
            <rect x="28" y="56" width="28" height="22" fill="white"/>
            <rect x="37" y="65" width="12" height="13" rx="3" fill="#1A6FB0"/>
          </svg>
          AquaDom
        </a>
        <div className="nav-links">
          <a href="/" className="nav-link">Главная</a>
          <a href="/catalog" className="nav-link" style={{color:'#1A6FB0'}}>Каталог</a>
          <a href="/#order" className="nav-cta">Заказать</a>
        </div>
      </nav>

      <div className="hero">
        <h1>💧 Каталог продукции</h1>
        <p>Дистиллированная вода и электролит с доставкой по Узбекистану</p>
      </div>

      {loading ? (
        <div className="loading">Загружаем товары...</div>
      ) : (
        <>
          <div className="cats">
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'all' ? `Все товары (${products.length})` : `${CATEGORIES[cat]} (${products.filter(p => p.category === cat).length})`}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="empty">Товары скоро появятся</div>
          ) : (
            <div className="grid">
              {filtered.map(p => {
                const discount = p.oldPrice && p.price < p.oldPrice
                  ? Math.round((1 - p.price / p.oldPrice) * 100)
                  : 0
                return (
                  <div key={p._id} className="card">
                    {p.imageUrl
                      ? <img src={p.imageUrl} alt={p.name} className="card-img"/>
                      : <div className="card-img-placeholder">💧</div>
                    }
                    <div className="card-body">
                      <div className="card-cat">{CATEGORIES[p.category] || p.category}</div>
                      <div className="card-name">{p.name}</div>
                      {p.volume && <div className="card-vol">Объём: {p.volume} л</div>}
                      <div className="card-prices">
                        <span className="card-price">{fmt(p.price)}</span>
                        {p.oldPrice && <span className="card-old">{fmt(p.oldPrice)}</span>}
                        {discount > 0 && <span className="card-discount">−{discount}%</span>}
                      </div>
                      <button className="card-btn" onClick={() => window.location.href='/#order'}>
                        Заказать
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </>
  )
}
