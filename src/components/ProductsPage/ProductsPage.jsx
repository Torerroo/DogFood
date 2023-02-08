/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { getSearchSelector } from '../../redux/slices/filterSlice'
import { getUserTokenSelector } from '../../redux/slices/getUserTokenSlice'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { withQuery } from '../HOCs/withQuery'
import { ProductItem } from '../ProductItem/ProductItem'
import './ProductsPage.css'

function ProductsInner({ products }) {
  if (products.total === 0) {
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
            {products.products.map((product) => (
              <ProductItem
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                pictures={product.pictures}
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
  const { token } = useSelector(getUserTokenSelector)

  const search = useSelector(getSearchSelector)

  const { data: products, isLoading } = useQuery({
    queryKey: ['GET_ALL_PRODUCTS', search],
    queryFn: () => dogFoodApi.getAllProducts(search, token),
    enabled: !!token,
  })
  return <ProductsInnerWithQuery products={products} isLoading={isLoading} />
}
