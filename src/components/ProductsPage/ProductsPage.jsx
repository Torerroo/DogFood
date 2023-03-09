/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getSearchSelector } from '../../redux/slices/filterSlice'
import { getUserInfoSelector } from '../../redux/slices/userInfoSlice'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { withQuery } from '../HOCs/withQuery'
import { ProductItem } from '../ProductItem/ProductItem'
import './ProductsPage.css'
import { FILTER_QUERY_NAME, getFilteredProducts } from '../Filters/constants'

function ProductsInner({ products }) {
  if (products.length === 0) {
    return (
      <section className="products">
        <div className="products__container">
          <p className="fs-1 opacity-75">Увы, ничего не найдено</p>
        </div>
      </section>
    )
  }
  if (products) {
    return (
      <section className="products">
        <div className="products__container">
          <div className="products__container-content">
            {products.map((product) => (
              <ProductItem
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                pictures={product.pictures}
                wight={product.wight}
                discount={product.discount}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }
}

const ProductsInnerWithQuery = withQuery(ProductsInner)

export function ProductsPage() {
  const { token } = useSelector(getUserInfoSelector)
  const search = useSelector(getSearchSelector)

  const [searchParams] = useSearchParams()
  const currentFilterNameFromQuery = searchParams.get(FILTER_QUERY_NAME)

  const { data = [], isLoading } = useQuery({
    queryKey: ['GET_ALL_PRODUCTS', search],
    queryFn: () => dogFoodApi.getAllProducts(search, token),
    enabled: !!token,
  })

  let { products } = data
  if (products) {
    if (currentFilterNameFromQuery) {
      products = getFilteredProducts(products, currentFilterNameFromQuery)
    }
  }

  return <ProductsInnerWithQuery products={products} isLoading={isLoading} />
}
