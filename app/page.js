'use client'
import { useState } from 'react'

const PRICES = { '1.5': 30000, '3': 58000, '5': 65000, '10': 85000 }
const FREQ_LABELS = { '7': 'Раз в неделю', '14': 'Раз в 2 недели', '30': 'Раз в месяц', '90': 'Раз в 3 месяца' }
const DUR_LABELS = { '7': '1 неделя', '30': '1 месяц', '90': '3 месяца', '180': '6 месяцев', '365': '1 год' }
const DISCOUNTS = { '7': 0, '30': 0, '90': 0.05, '180': 0.10, '365': 0.15 }

function fmt(n) { return n.toLocaleString('ru') + ' сум' }

export default function Home() {
  const [size, setSize] = useState(null)
  const [freq, setFreq] = useState(null)
  const [dur, setDur] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '', city: 'Ташкент', address: '', telegram: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const deliveries = size && freq && dur ? Math.floor(parseInt(dur) / parseInt(freq)) : 0
  const validCombo = deliveries >= 1
  const discount = dur ? DISCOUNTS[dur] || 0 : 0
  const pricePerDel = size ? Math.round(PRICES[size] * (1 - discount)) : 0
  const total = pricePerDel * deliveries
  const saved = size ? Math.round(PRICES[size] * discount * deliveries) : 0
  const showSummary = size && freq && dur && validCombo

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address) {
      setError('Заполните имя, телефон и адрес')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          size, freq: FREQ_LABELS[freq], dur: DUR_LABELS[dur],
          deliveries, total: fmt(total), price: fmt(pricePerDel)
        })
      })
      const data = await res.json()
      if (data.success) setSuccess(true)
      else setError('Ошибка отправки. Напишите нам в Telegram.')
    } catch {
      setError('Ошибка сети. Напишите нам в Telegram.')
    }
    setLoading(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;700;800&display=swap');
        :root{--blue:#1A6FB0;--bd:#0F4F85;--bl:#E8F4FD;--bm:#BEDAF5;--cr:#F7F9FC;--tx:#1A2332;--mu:#5A7090;--wh:#fff;--gl:#E6F7EE;--r:14px;}
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Nunito',sans-serif;background:var(--cr);color:var(--tx);}
        nav{background:var(--wh);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #E5EEF8;position:sticky;top:0;z-index:100;}
        .logo{display:flex;align-items:center;gap:9px;font-size:19px;font-weight:800;color:var(--bd);text-decoration:none;}
        .nav-cta{background:var(--blue);color:white;border:none;padding:8px 18px;border-radius:50px;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;}
        .warn-bar{background:#FFF3CD;border-bottom:1px solid #FFE082;padding:9px 24px;text-align:center;font-size:12px;color:#7B5800;font-weight:600;}
        .hero{padding:44px 24px 32px;text-align:center;max-width:640px;margin:0 auto;}
        .hero-badge{display:inline-flex;align-items:center;gap:6px;background:#FFF8E1;color:#7B5800;font-size:12px;font-weight:700;padding:5px 13px;border-radius:50px;margin-bottom:16px;border:1px solid #FFE082;}
        h1{font-size:36px;font-weight:800;line-height:1.15;margin-bottom:12px;letter-spacing:-1px;}
        h1 span{color:var(--blue);}
        .hero p{font-size:15px;color:var(--mu);margin-bottom:26px;max-width:420px;margin-left:auto;margin-right:auto;line-height:1.6;}
        .hero-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;}
        .btn-p{background:var(--blue);color:white;border:none;padding:12px 24px;border-radius:50px;font-family:inherit;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 4px 14px rgba(26,111,176,0.3);}
        .btn-p:hover{background:var(--bd);}
        .btn-s{background:var(--wh);color:var(--blue);border:2px solid var(--bm);padding:12px 24px;border-radius:50px;font-family:inherit;font-size:14px;font-weight:700;cursor:pointer;}
        .trust{background:var(--wh);padding:16px 24px;display:flex;justify-content:center;gap:28px;flex-wrap:wrap;border-bottom:1px solid #E5EEF8;}
        .ti{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--mu);font-weight:600;}
        section{padding:40px 24px;max-width:640px;margin:0 auto;}
        .sl{font-size:11px;font-weight:800;color:var(--blue);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:7px;}
        .st{font-size:24px;font-weight:800;margin-bottom:5px;letter-spacing:-0.5px;}
        .ss{font-size:14px;color:var(--mu);margin-bottom:22px;}
        .use-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;}
        .uc{background:var(--wh);border:1px solid #E5EEF8;border-radius:var(--r);padding:16px 12px;text-align:center;}
        .uc-icon{font-size:28px;margin-bottom:8px;}
        .uc-name{font-size:13px;font-weight:700;margin-bottom:3px;}
        .uc-desc{font-size:11px;color:var(--mu);line-height:1.5;}
        .why-box{background:var(--wh);border-radius:var(--r);border:1px solid #E5EEF8;padding:18px;margin-bottom:10px;display:flex;gap:13px;align-items:flex-start;}
        .wi{font-size:20px;min-width:34px;height:34px;background:var(--bl);border-radius:9px;display:flex;align-items:center;justify-content:center;}
        .wt{font-size:13px;font-weight:700;margin-bottom:2px;}
        .wd{font-size:12px;color:var(--mu);line-height:1.5;}
        .steps{display:flex;flex-direction:column;gap:10px;}
        .step{background:var(--wh);border-radius:var(--r);padding:16px 18px;display:flex;gap:14px;border:1px solid #E5EEF8;}
        .sn{min-width:34px;height:34px;background:var(--bl);color:var(--blue);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;}
        .stit{font-size:13px;font-weight:700;margin-bottom:2px;}
        .sdesc{font-size:12px;color:var(--mu);}
        .calc-wrap{background:var(--wh);border-radius:20px;border:1px solid #E5EEF8;padding:24px;}
        .clabel{font-size:11px;font-weight:800;color:var(--blue);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:9px;}
        .og{display:grid;gap:8px;margin-bottom:20px;}
        .og.c4{grid-template-columns:repeat(4,1fr);}
        .og.c2{grid-template-columns:1fr 1fr;}
        .opt{background:var(--cr);border:2px solid #E5EEF8;border-radius:var(--r);padding:12px 8px;text-align:center;cursor:pointer;transition:all 0.15s;user-select:none;}
        .opt:hover{border-color:var(--bm);}
        .opt.sel{border-color:var(--blue);background:var(--bl);}
        .om{font-size:14px;font-weight:800;}
        .opt.sel .om{color:var(--bd);}
        .os{font-size:10px;color:var(--mu);margin-top:2px;}
        .op{font-size:11px;font-weight:700;color:var(--blue);margin-top:3px;}
        .ob{display:inline-block;font-size:9px;font-weight:800;background:#FFF3CD;color:#856404;padding:2px 7px;border-radius:20px;margin-top:3px;}
        .opt.sel .ob{background:var(--blue);color:white;}
        .disc-strip{background:var(--bl);border-radius:10px;padding:9px 13px;margin-bottom:18px;font-size:12px;color:var(--bd);}
        .warn-combo{background:#FFF8E1;border:1px solid #FFE082;border-radius:10px;padding:10px 13px;font-size:12px;color:#7B5800;margin-bottom:14px;}
        .summary-box{background:var(--bl);border:2px solid var(--bm);border-radius:var(--r);padding:18px;margin-bottom:14px;}
        .sum-title{font-size:10px;font-weight:800;color:var(--mu);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:12px;}
        .sr{display:flex;justify-content:space-between;font-size:13px;margin-bottom:7px;}
        .sr span:first-child{color:var(--mu);}
        .sr span:last-child{font-weight:700;}
        .sdiv{height:1px;background:var(--bm);margin:10px 0;}
        .tot-row{display:flex;justify-content:space-between;align-items:flex-end;}
        .tot-label{font-size:14px;font-weight:700;}
        .tot-price{font-size:24px;font-weight:800;color:var(--bd);}
        .tot-note{font-size:11px;color:var(--mu);text-align:right;}
        .saving{display:inline-block;background:var(--gl);color:#1A8F5A;font-size:11px;font-weight:800;padding:3px 10px;border-radius:20px;margin-top:5px;}
        .rem-info{background:var(--gl);border:1px solid #A8DFC0;border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;color:#0F5A38;line-height:1.7;}
        .fg{margin-bottom:12px;}
        .fg label{display:block;font-size:12px;font-weight:700;color:var(--tx);margin-bottom:4px;}
        .frow{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;}
        input,select{width:100%;font-family:inherit;font-size:13px;padding:10px 12px;border:1.5px solid #E5EEF8;border-radius:11px;outline:none;background:var(--cr);color:var(--tx);transition:border 0.2s;}
        input:focus,select:focus{border-color:var(--blue);background:white;}
        .tg-hint{font-size:11px;color:var(--mu);margin-top:3px;}
        .err{font-size:12px;color:#D85A30;margin-bottom:10px;padding:8px 12px;background:#FAECE7;border-radius:8px;}
        .submit{width:100%;padding:14px;background:var(--blue);color:white;border:none;border-radius:50px;font-family:inherit;font-size:15px;font-weight:800;cursor:pointer;margin-top:4px;box-shadow:0 4px 14px rgba(26,111,176,0.25);}
        .submit:hover{background:var(--bd);}
        .submit:disabled{background:#B0C8E0;cursor:default;box-shadow:none;}
        .form-note{font-size:11px;color:var(--mu);text-align:center;margin-top:7px;}
        .success-box{background:var(--gl);border:2px solid #A8DFC0;border-radius:var(--r);padding:24px;text-align:center;}
        .success-box h3{font-size:18px;font-weight:800;color:#0F5A38;margin-bottom:8px;}
        .success-box p{font-size:14px;color:#1A8F5A;}
        .b2b-box{background:var(--bd);border-radius:var(--r);padding:22px;color:white;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;}
        .b2b-title{font-size:16px;font-weight:800;margin-bottom:3px;}
        .b2b-sub{font-size:12px;opacity:0.7;margin-bottom:8px;}
        .b2b-tags{display:flex;gap:7px;flex-wrap:wrap;}
        .b2b-tag{background:rgba(255,255,255,0.12);font-size:11px;padding:3px 10px;border-radius:50px;font-weight:600;}
        .b2b-btn{background:white;color:var(--bd);border:none;padding:11px 20px;border-radius:50px;font-family:inherit;font-size:13px;font-weight:800;cursor:pointer;white-space:nowrap;text-decoration:none;}
        footer{background:var(--bd);color:white;padding:24px;text-align:center;}
        .fl{font-size:17px;font-weight:800;margin-bottom:5px;}
        .fsub{font-size:11px;opacity:0.5;margin-bottom:12px;}
        .fc{display:flex;justify-content:center;gap:18px;flex-wrap:wrap;font-size:12px;opacity:0.7;}
        @media(max-width:480px){
          h1{font-size:28px;}
          .og.c4{grid-template-columns:1fr 1fr;}
          .frow{grid-template-columns:1fr;}
          .b2b-box{flex-direction:column;}
          .trust{gap:14px;}
        }
      `}</style>

      {/* NAV */}
      <nav>
        <a href="/" className="logo">
          <svg width="30" height="30" viewBox="0 0 84 90" fill="none">
            <path d="M42 5C20 27 8 49 8 63C8 77 24 90 42 90C60 90 76 77 76 63C76 49 64 27 42 5Z" fill="#1A6FB0"/>
            <polygon points="28,57 42,42 56,57" fill="white"/>
            <rect x="28" y="56" width="28" height="22" fill="white"/>
            <rect x="37" y="65" width="12" height="13" rx="3" fill="#1A6FB0"/>
          </svg>
          AquaDom
        </a>
        <button className="nav-cta" onClick={() => document.getElementById('order').scrollIntoView({behavior:'smooth'})}>
          Заказать
        </button>
      </nav>

      <div className="warn-bar">
        ⚠️ Дистиллированная вода — <strong>не для питья</strong>. Только для технических нужд.
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="hero-badge">🔬 Дистиллированная вода · ГОСТ</div>
        <h1>Вода для техники —<br/><span>не для питья</span></h1>
        <p>Для увлажнителей, утюгов, аккумуляторов и радиаторов. Доставка по всему Узбекистану.</p>
        <div className="hero-btns">
          <button className="btn-p" onClick={() => document.getElementById('order').scrollIntoView({behavior:'smooth'})}>
            Оформить доставку
          </button>
          <button className="btn-s" onClick={() => document.getElementById('use').scrollIntoView({behavior:'smooth'})}>
            Для чего нужна?
          </button>
        </div>
      </div>

      <div className="trust">
        <div className="ti">✅ 100% дистиллят</div>
        <div className="ti">🚚 Весь Узбекистан</div>
        <div className="ti">🔄 Подписка или разово</div>
        <div className="ti">📦 Тара в комплекте</div>
      </div>

      {/* USE CASES */}
      <section id="use">
        <div className="sl">Применение</div>
        <div className="st">Для чего нужна дистиллированная вода?</div>
        <div className="ss">Обычная вода содержит соли — они разрушают технику. Дистиллят — нет.</div>
        <div className="use-grid">
          {[
            {icon:'💨',name:'Увлажнители',desc:'Нет накипи и белого налёта'},
            {icon:'👕',name:'Утюги',desc:'Паровая подошва не засоряется'},
            {icon:'🚗',name:'Аккумуляторы',desc:'Долив в авто и мото'},
            {icon:'🌡️',name:'Радиаторы',desc:'Охлаждение без коррозии'},
            {icon:'🔬',name:'Лаборатории',desc:'Реактивы и анализы'},
            {icon:'🐠',name:'Аквариумы',desc:'Контролируемый состав'},
          ].map(u => (
            <div key={u.name} className="uc">
              <div className="uc-icon">{u.icon}</div>
              <div className="uc-name">{u.name}</div>
              <div className="uc-desc">{u.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section style={{paddingTop:0}}>
        <div className="sl">Почему дистиллят</div>
        <div className="st">Чем отличается от обычной воды?</div>
        {[
          {icon:'⚗️',title:'0 примесей и солей',desc:'Дистилляция удаляет все минералы, хлор и органику. Чистота 99.9%.'},
          {icon:'⚙️',title:'Техника служит дольше',desc:'Накипь в утюге или увлажнителе — главная причина поломок. Дистиллят исключает это.'},
          {icon:'🚘',title:'Обязателен для авто',desc:'Производители прямо указывают: в аккумулятор и радиатор — только дистиллированная вода.'},
        ].map(w => (
          <div key={w.title} className="why-box">
            <div className="wi">{w.icon}</div>
            <div><div className="wt">{w.title}</div><div className="wd">{w.desc}</div></div>
          </div>
        ))}
      </section>

      {/* STEPS */}
      <section style={{paddingTop:0}}>
        <div className="sl">Как работает</div>
        <div className="st">Три шага до доставки</div>
        <div className="steps">
          {[
            {n:1,t:'Настройте объём и частоту',d:'1.5, 3, 5 или 10 литров. Разово или подписка.'},
            {n:2,t:'Оставьте заявку',d:'Мы свяжемся в Telegram в течение часа для подтверждения.'},
            {n:3,t:'Получите с уведомлением',d:'За день до доставки придёт напоминание в Telegram.'},
          ].map(s => (
            <div key={s.n} className="step">
              <div className="sn">{s.n}</div>
              <div><div className="stit">{s.t}</div><div className="sdesc">{s.d}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* ORDER + CALCULATOR */}
      <section id="order" style={{paddingTop:0}}>
        <div className="sl">Заказ</div>
        <div className="st">Оформить доставку</div>
        <div className="ss">Настройте подписку — калькулятор посчитает итог</div>

        <div className="calc-wrap">
          {/* STEP 1 */}
          <div className="clabel">Шаг 1 — Объём тары</div>
          <div className="og c4">
            {[
              {v:'1.5',label:'1.5 л',sub:'Утюги, небольшие увлажнители',price:'30 000'},
              {v:'3',  label:'3 л',  sub:'Увлажнители, аккумуляторы',  price:'58 000'},
              {v:'5',  label:'5 л',  sub:'Авто + техника дома',         price:'65 000'},
              {v:'10', label:'10 л', sub:'СТО, большой запас',          price:'85 000'},
            ].map(o => (
              <div key={o.v} className={`opt${size===o.v?' sel':''}`} onClick={()=>setSize(o.v)}>
                <div className="om">{o.label}</div>
                <div className="os">{o.sub}</div>
                <div className="op">{o.price} сум</div>
              </div>
            ))}
          </div>

          {/* STEP 2 */}
          <div className="clabel">Шаг 2 — Частота доставки</div>
          <div className="og c2">
            {[
              {v:'7', l:'Раз в неделю',    s:'Каждые 7 дней'},
              {v:'14',l:'Раз в 2 недели',  s:'Каждые 14 дней'},
              {v:'30',l:'Раз в месяц',     s:'Каждые 30 дней'},
              {v:'90',l:'Раз в 3 месяца',  s:'Каждые 90 дней'},
            ].map(o => (
              <div key={o.v} className={`opt${freq===o.v?' sel':''}`} onClick={()=>setFreq(o.v)}>
                <div className="om">{o.l}</div>
                <div className="os">{o.s}</div>
              </div>
            ))}
          </div>

          {/* STEP 3 */}
          <div className="clabel">Шаг 3 — Срок подписки</div>
          <div className="disc-strip">💡 Скидки: <strong>3 мес → −5%</strong> · <strong>6 мес → −10%</strong> · <strong>1 год → −15%</strong></div>
          <div className="og c2">
            {[
              {v:'7',  l:'1 неделя',  s:'Попробовать', disc:null},
              {v:'30', l:'1 месяц',   s:'30 дней',     disc:null},
              {v:'90', l:'3 месяца',  s:null,           disc:'−5%'},
              {v:'180',l:'6 месяцев', s:null,           disc:'−10%'},
              {v:'365',l:'1 год',     s:null,           disc:'−15%'},
            ].map(o => (
              <div key={o.v} className={`opt${dur===o.v?' sel':''}`} onClick={()=>setDur(o.v)}>
                <div className="om">{o.l}</div>
                {o.s && <div className="os">{o.s}</div>}
                {o.disc && <div className="ob">{o.disc}</div>}
              </div>
            ))}
          </div>

          {/* WARN */}
          {size && freq && dur && !validCombo && (
            <div className="warn-combo">⚠️ При выбранной частоте за этот срок будет меньше 1 доставки. Выберите другую комбинацию.</div>
          )}

          {/* SUMMARY */}
          {showSummary && (
            <>
              <div className="summary-box">
                <div className="sum-title">Ваша подписка</div>
                <div className="sr"><span>Объём</span><span>{size} л</span></div>
                <div className="sr"><span>Цена за доставку</span><span>{fmt(pricePerDel)}{discount>0?` (−${discount*100}%)`:''}</span></div>
                <div className="sr"><span>Частота</span><span>{FREQ_LABELS[freq]}</span></div>
                <div className="sr"><span>Срок</span><span>{DUR_LABELS[dur]}</span></div>
                <div className="sr"><span>Количество доставок</span><span>{deliveries} {deliveries===1?'доставка':deliveries<5?'доставки':'доставок'}</span></div>
                <div className="sdiv"/>
                <div className="tot-row">
                  <div className="tot-label">Итого</div>
                  <div style={{textAlign:'right'}}>
                    <div className="tot-price">{fmt(total)}</div>
                    <div className="tot-note">{fmt(pricePerDel)} / доставка</div>
                    {saved>0 && <div className="saving">Экономия {fmt(saved)}</div>}
                  </div>
                </div>
              </div>

              <div className="rem-info">
                🔔 <strong>Автонапоминания включены.</strong> За день до каждой доставки вы получите уведомление в Telegram.
              </div>

              {/* FORM */}
              {!success ? (
                <>
                  <div className="clabel" style={{marginTop:4}}>Шаг 4 — Ваши данные</div>
                  <div className="frow">
                    <div className="fg" style={{marginBottom:0}}>
                      <label>Имя</label>
                      <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Алишер"/>
                    </div>
                    <div className="fg" style={{marginBottom:0}}>
                      <label>Телефон</label>
                      <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+998 90 000 00 00" type="tel"/>
                    </div>
                  </div>
                  <div className="fg">
                    <label>Город</label>
                    <select value={form.city} onChange={e=>setForm({...form,city:e.target.value})}>
                      {['Ташкент','Самарканд','Бухара','Наманган','Андижан','Фергана','Другой'].map(c=>(
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="fg">
                    <label>Адрес доставки</label>
                    <input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Улица, дом, квартира"/>
                  </div>
                  <div className="fg">
                    <label>Telegram (для уведомлений о статусе)</label>
                    <input value={form.telegram} onChange={e=>setForm({...form,telegram:e.target.value})} placeholder="@username"/>
                    <div className="tg-hint">Начните диалог с ботом: <a href="https://t.me/aquadomm_bot" target="_blank" rel="noopener">t.me/aquadomm_bot</a></div>
                  </div>
                  {error && <div className="err">{error}</div>}
                  <button className="submit" onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Отправляем...' : 'Оформить подписку →'}
                  </button>
                  <div className="form-note">Свяжемся в Telegram в течение часа</div>
                </>
              ) : (
  <div className="success-box">
    <h3>✅ Заявка принята!</h3>
    <div style={{margin:'16px 0',padding:'14px',background:'#E8F4FD',borderRadius:'12px',textAlign:'center'}}>
      <div style={{fontSize:'13px',color:'#5A7090',marginBottom:'6px'}}>Номер вашего заказа</div>
      <div style={{fontSize:'28px',fontWeight:'800',color:'#0F4F85',letterSpacing:'2px',marginBottom:'10px'}}>{orderNum}</div>
      <button
        onClick={()=>{navigator.clipboard.writeText(orderNum);alert('Номер скопирован!')}}
        style={{background:'white',border:'1.5px solid #BEDAF5',borderRadius:'50px',padding:'6px 16px',fontSize:'13px',fontWeight:'700',color:'#1A6FB0',cursor:'pointer',marginBottom:'12px'}}
      >
        Скопировать номер
      </button>
    </div>
    
      href={'https://t.me/aquadomm_bot'}
      target="_blank"
      rel="noopener"
      style={{display:'block',background:'#1A6FB0',color:'white',padding:'13px',borderRadius:'50px',textAlign:'center',fontWeight:'800',fontSize:'15px',textDecoration:'none',marginTop:'8px'}}
    >
      Отслеживать заказ в Telegram
    </a>
    <p style={{fontSize:'12px',color:'#5A7090',marginTop:'10px',textAlign:'center'}}>Нажмите кнопку выше и введите номер заказа в боте</p>
  </div>
)}
            </>
          )}
        </div>
      </section>

      {/* B2B */}
      <section style={{paddingTop:0}}>
        <div className="b2b-box">
          <div>
            <div className="b2b-title">Для бизнеса — отдельные условия</div>
            <div className="b2b-sub">Крупные объёмы, счёт-фактура, персональный менеджер</div>
            <div className="b2b-tags">
              <span className="b2b-tag">🔧 СТО</span>
              <span className="b2b-tag">🔬 Лаборатории</span>
              <span className="b2b-tag">🏭 Предприятия</span>
              <span className="b2b-tag">🏥 Медучреждения</span>
            </div>
          </div>
          <a href="https://t.me/aquadomm_bot" target="_blank" rel="noopener" className="b2b-btn">
            Написать в Telegram →
          </a>
        </div>
      </section>

      <footer>
        <div className="fl">💧 AquaDom</div>
        <div className="fsub">Дистиллированная вода для техники · Не для питья</div>
        <div className="fc">
          <span>📱 @aquadomm_bot</span>
          <span>📍 Весь Узбекистан</span>
          <span>🌐 aquadom.uz</span>
        </div>
      </footer>
    </>
  )
}
