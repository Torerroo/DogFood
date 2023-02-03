import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getSearchSelector } from '../../redux/slices/filterSlice'
import { getUserTokenSelector } from '../../redux/slices/getUserTokenSlice'
import { dogFoodApi } from '../Api/DogFoodApi'
import { withQuery } from '../HOCs/withQuery'
import { ProductItem } from '../ProductItem/ProductItem'
import './ProductsPage.css'

function ProductsInner({ products }) {
  if (products) {
    return (
      <section className="products">
        <div className="products__container">
          <h1 className="products__container-head">Все товары</h1>
          <div className="products__container-content">
            {products.map((product) => (
              <ProductItem
                // eslint-disable-next-line no-underscore-dangle
                key={product._id}
                product={product}
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

  if (!token) {
    return (
      <section className="products__container">
        <div className="products__container-auth">
          <h1>
            Вы не авторизованы, чтобы увидеть список товаров необходимо
            {' '}

            <Link to="/signin">Войти</Link>
            .
          </h1>
        </div>
      </section>
    )
  }
  const search = useSelector(getSearchSelector)

  const { data: products, isLoading } = useQuery({
    queryKey: ['GET_ALL_PRODUCTS', search],
    queryFn: () => dogFoodApi.getAllProducts().then((res) => res.products),
  })
  return <ProductsInnerWithQuery products={products} isLoading={isLoading} />
}
