const LOW_PRICE = 'LOW_PRICE'
const HIGH_PRICE = 'HIGH_PRICE'
const OLD_DATA = 'OLD_DATA'
const NEW_DATA = 'NEW_DATA'
const SALES = 'SALES'
const POPULAR = 'POPULAR'

export const PRICE_FILTER = {
  type: [LOW_PRICE, HIGH_PRICE],
  name: 'Цена',
}

export const SALES_FILTER = {
  type: SALES,
  name: 'Скидки',
}

export const DATA_FILTER = {
  type: [NEW_DATA, OLD_DATA],
  name: 'Дата',
}

export const POPULAR_FILTER = {
  type: POPULAR,
  name: 'Популярные',
}

export const FILTER_QUERY_NAME = 'filterType'

export const getFilteredProducts = ([...products], filterType) => {
  switch (filterType) {
    case LOW_PRICE:
      return products.sort((a, b) => a.price - b.price)
    case HIGH_PRICE:
      return products.sort((a, b) => b.price - a.price)
    case OLD_DATA:
      return products.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at))
    case NEW_DATA:
      return products.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
    case SALES:
      return products.filter((product) => !!product.discount)
    case POPULAR:
      return products.sort((a, b) => b.reviews.length - a.reviews.length)
    default:
      return products
  }
}
