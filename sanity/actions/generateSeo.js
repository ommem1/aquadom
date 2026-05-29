import { useDocumentOperation } from 'sanity'
import { useState } from 'react'

const CATEGORY_LABEL = {
  distilled: 'дистиллированная',
  double: 'двойной дистилляции',
  triple: 'тройной дистилляции',
  electrolyte: 'электролит',
  silver: 'с ионами серебра',
  bulk: 'оптом',
}

const CATEGORY_USE = {
  distilled: 'для утюгов, увлажнителей, аккумуляторов и радиаторов',
  double: 'для медицинского и лабораторного оборудования',
  triple: 'для точных приборов и химических процессов',
  electrolyte: 'для аккумуляторов и аккумуляторных батарей',
  silver: 'для питья и медицинских целей',
  bulk: 'для оптовых поставок и производств',
}

export function GenerateSeoAction(props) {
  const { patch } = useDocumentOperation(props.id, props.type)
  const [status, setStatus] = useState('idle') // idle | loading | done | error

  const label = {
    idle: 'Сгенерировать SEO',
    loading: 'Генерирую...',
    done: 'SEO обновлён!',
    error: 'Ошибка — повторить',
  }[status]

  return {
    label,
    tone: status === 'done' ? 'positive' : status === 'error' ? 'critical' : 'primary',
    disabled: status === 'loading',
    onHandle: () => {
      setStatus('loading')

      const doc = props.draft || props.published
      if (!doc) {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
        return
      }

      const { name, category, variants } = doc
      const catLabel = CATEGORY_LABEL[category] || 'дистиллированная'
      const catUse = CATEGORY_USE[category] || ''

      // Собираем данные по всем вариантам
      const availVariants = (variants || []).filter(v => v.inStock !== false)
      const allVariants = variants || []
      const volumes = allVariants.map(v => v.volume).filter(Boolean).sort((a, b) => a - b)
      const prices = allVariants.map(v => v.price).filter(Boolean)
      const minPrice = prices.length ? Math.min(...prices) : null
      const maxPrice = prices.length ? Math.max(...prices) : null

      // Строки для вставки в текст
      const volList = volumes.length ? volumes.join(', ') + ' л' : ''       // "1.5, 3, 5, 10 л"
      const priceFrom = minPrice ? minPrice.toLocaleString('ru-RU') : ''
      const priceTo = maxPrice && maxPrice !== minPrice ? maxPrice.toLocaleString('ru-RU') : ''
      const priceStr = priceFrom
        ? (priceTo ? `от ${priceFrom} до ${priceTo} сум` : `от ${priceFrom} сум`)
        : ''

      // SEO title (до 60 символов) — без объёма, он в description
      const rawTitle = name
        ? `${name} — купить в Ташкенте | AquaDom`
        : `Вода ${catLabel} — купить в Ташкенте | AquaDom`
      const seoTitle = rawTitle.slice(0, 60)

      // SEO description (до 160 символов)
      const rawDesc = [
        `Вода дистиллированная ${catLabel}.`,
        volList ? `Объёмы: ${volList}.` : '',
        priceStr ? `Цена ${priceStr}.` : '',
        'ГОСТ, собственное производство.',
        catUse ? `Подходит ${catUse}.` : '',
        'Доставка по Узбекистану.',
      ].filter(Boolean).join(' ')
      const seoDescription = rawDesc.slice(0, 160)

      // Ключевые слова — включаем все объёмы отдельно
      const volKeywords = volumes.map(v => `дистиллированная вода ${v} л`)
      const keywords = [
        `дистиллированная вода ${catLabel}`,
        ...volKeywords,
        'вода для аккумулятора',
        'вода для утюга',
        'вода для увлажнителя',
        'купить дистиллят Ташкент',
        'AquaDom',
      ].join(', ')

      try {
        // patch.execute обновляет форму мгновенно, без перезагрузки
        patch.execute([
          { setIfMissing: { seo: {} } },
          { set: { 'seo.title': seoTitle, 'seo.description': seoDescription, 'seo.keywords': keywords } },
        ])
        setStatus('done')
        setTimeout(() => setStatus('idle'), 3000)
      } catch (err) {
        console.error('GenerateSeo error:', err)
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    },
  }
}
