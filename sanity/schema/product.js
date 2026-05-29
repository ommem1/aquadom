export default {
  name: 'product',
  title: 'Товар',
  type: 'document',
  fields: [
    // Основная информация
    {
      name: 'name',
      title: 'Название товара',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      description: 'Используется в адресе страницы. Пример: distillirovannaya-voda',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          { title: 'Дистиллированная вода', value: 'distilled' },
          { title: 'Двойная дистилляция', value: 'double' },
          { title: 'Тройная дистилляция', value: 'triple' },
          { title: 'Электролит', value: 'electrolyte' },
          { title: 'Вода с ионами серебра', value: 'silver' },
          { title: 'Оптом (от 100л)', value: 'bulk' },
        ]
      },
      validation: Rule => Rule.required()
    },

    // Цена — для товаров БЕЗ вариантов объёма
    {
      name: 'price',
      title: 'Цена (сум)',
      description: 'Заполните если у товара один объём. Если есть варианты — укажите цены там.',
      type: 'number',
    },
    {
      name: 'oldPrice',
      title: 'Старая цена (сум)',
      description: 'Если есть скидка — укажите цену до скидки',
      type: 'number',
    },
    {
      name: 'volume',
      title: 'Объём (л)',
      description: 'Заполните если у товара один объём.',
      type: 'number',
    },
    {
      name: 'inStock',
      title: 'В наличии',
      type: 'boolean',
      initialValue: true,
    },

    // Варианты объёмов и цен
    {
      name: 'variants',
      title: 'Варианты (объём + цена)',
      description: 'Добавьте все доступные объёмы с ценами. Первый вариант будет выбран по умолчанию.',
      type: 'array',
      validation: Rule => Rule.required().min(1).error('Добавьте хотя бы один вариант'),
      of: [{
        type: 'object',
        name: 'variant',
        title: 'Вариант',
        fields: [
          {
            name: 'volume',
            title: 'Объём (л)',
            type: 'number',
            validation: Rule => Rule.required()
          },
          {
            name: 'price',
            title: 'Цена (сум)',
            type: 'number',
            validation: Rule => Rule.required()
          },
          {
            name: 'oldPrice',
            title: 'Старая цена (сум)',
            description: 'Если есть скидка — укажите цену до скидки',
            type: 'number',
          },
          {
            name: 'inStock',
            title: 'В наличии',
            type: 'boolean',
            initialValue: true,
          },
        ],
        preview: {
          select: { volume: 'volume', price: 'price', inStock: 'inStock' },
          prepare({ volume, price, inStock }) {
            return {
              title: `${volume} л — ${price?.toLocaleString('ru-RU')} сум`,
              subtitle: inStock === false ? '❌ Нет в наличии' : '✅ В наличии'
            }
          }
        }
      }]
    },

    {
      name: 'image',
      title: 'Фото товара',
      type: 'image',
      options: { hotspot: true }
    },

    // Описание и характеристики
    {
      name: 'description',
      title: 'Описание товара',
      description: 'Подробное описание для страницы товара. Используйте ключевые слова.',
      type: 'text',
      rows: 5,
    },
    {
      name: 'specs',
      title: 'Характеристики',
      description: 'Технические характеристики товара',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'key', title: 'Параметр', type: 'string' },
          { name: 'value', title: 'Значение', type: 'string' },
        ],
        preview: {
          select: { title: 'key', subtitle: 'value' }
        }
      }]
    },

    // Ссылки на маркетплейсы
    {
      name: 'uzumUrl',
      title: 'Ссылка на Uzum Market',
      description: 'Прямая ссылка на товар на Uzum Market',
      type: 'url',
    },

    // SEO поля
    {
      name: 'seo',
      title: 'SEO настройки',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'SEO заголовок',
          description: 'Заголовок в Google (до 60 символов). Пример: Дистиллированная вода — купить в Ташкенте | AquaDom',
          type: 'string',
          validation: Rule => Rule.max(60).warning('Рекомендуется до 60 символов')
        },
        {
          name: 'description',
          title: 'SEO описание',
          description: 'Описание в Google (до 160 символов). Включите ключевые слова.',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.max(160).warning('Рекомендуется до 160 символов')
        },
        {
          name: 'keywords',
          title: 'Ключевые слова',
          description: 'Через запятую. Пример: дистиллированная вода, дистиллят, вода для аккумулятора',
          type: 'string',
        },
      ]
    },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
      v0: 'variants.0.volume',
      p0: 'variants.0.price',
    },
    prepare({ title, subtitle, media, v0, p0 }) {
      const cats = {
        distilled: 'Дистиллированная вода',
        double: 'Двойная дистилляция',
        triple: 'Тройная дистилляция',
        electrolyte: 'Электролит',
        silver: 'Ионы серебра',
        bulk: 'Оптом'
      }
      const priceStr = p0 ? ` · от ${p0.toLocaleString('ru-RU')} сум` : ''
      return {
        title,
        subtitle: (cats[subtitle] || subtitle) + priceStr,
        media
      }
    }
  }
}
