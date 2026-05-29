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

      const { name, category, volume, price } = doc
      const catLabel = CATEGORY_LABEL[category] || 'дистиллированная'
      const catUse = CATEGORY_USE[category] || ''
      const volStr = volume ? `${volume} л` : ''
      const priceStr = price ? price.toLocaleString('ru-RU') : ''

      // SEO title (до 60 символов)
      const rawTitle = name
        ? `${name} — купить в Ташкенте | AquaDom`
        : `Вода ${catLabel}${volStr ? ' ' + volStr : ''} — купить в Ташкенте | AquaDom`
      const seoTitle = rawTitle.slice(0, 60)

      // SEO description (до 160 символов)
      const rawDesc = [
        `Вода дистиллированная ${catLabel}${volStr ? ' ' + volStr : ''}.`,
        priceStr ? `Цена ${priceStr} сум.` : '',
        'Собственное производство, ГОСТ.',
        catUse ? `Подходит ${catUse}.` : '',
        'Доставка по всему Узбекистану.',
      ].filter(Boolean).join(' ')
      const seoDescription = rawDesc.slice(0, 160)

      // Ключевые слова
      const keywords = [
        `дистиллированная вода${volStr ? ' ' + volStr : ''}`,
        volStr ? `дистиллят ${volStr}` : 'дистиллят',
        'вода для аккумулятора',
        'вода для утюга',
        'вода для увлажнителя',
        'купить дистиллят Ташкент',
        'дистиллированная вода Узбекистан',
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
