export default {
  name: 'product',
  title: 'Товар',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Название',
      type: 'string',
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
          { title: 'Оптом', value: 'bulk' },
        ]
      }
    },
    {
      name: 'volume',
      title: 'Объём (л)',
      type: 'number',
    },
    {
      name: 'price',
      title: 'Цена (сум)',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'oldPrice',
      title: 'Цена до скидки (сум)',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Фото',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'description',
      title: 'Описание',
      type: 'text',
    },
    {
      name: 'inStock',
      title: 'В наличии',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'sku',
      title: 'SKU',
      type: 'string',
    },
  ]
}
