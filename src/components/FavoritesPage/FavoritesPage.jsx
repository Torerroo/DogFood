/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getFavoriteSelector } from '../../redux/slices/favoriteSlice'
import FavoritesStyles from './FavoritesPage.module.css'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { getUserInfoSelector } from '../../redux/slices/userInfoSlice'
import { ProductItem } from '../ProductItem/ProductItem'
import { withQuery } from '../HOCs/withQuery'

function FavoritesInner({ products }) {
  if (products.length >= 1) {
    return (
      <section className={FavoritesStyles.favorites}>
        <div className={FavoritesStyles.favorites__title}>Избранное</div>
        <div className={FavoritesStyles.favorites__content}>
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
      </section>
    )
  }
  return (
    <section className={FavoritesStyles.favorites}>
      <div className={FavoritesStyles.favorites__auth}>
        <p>У вас нету избранных товаров</p>
        <p><Link to="../products">Каталог</Link></p>
      </div>
    </section>
  )
}

const FavoritesInnerWithQuery = withQuery(FavoritesInner)

export function FavoritesPage() {
  const { token } = useSelector(getUserInfoSelector)
  const favoritesProduct = useSelector(getFavoriteSelector)

  const { data: products, isLoading } = useQuery({
    queryKey: ['cart', favoritesProduct],
    queryFn: () => dogFoodApi.getProductsByIds(favoritesProduct, token),
    keepPreviousData: true,
  })

  return (
    <FavoritesInnerWithQuery
      products={products}
      isLoading={isLoading}
    />
  )
}
