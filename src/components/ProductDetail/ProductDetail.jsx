/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { getUserInfoSelector } from '../../redux/slices/userInfoSlice'
import { dogFoodApi } from '../../Api/DogFoodApi'
import styleProductDetail from './ProductDetail.module.css'
import { addFavoriteProduct, deleteFavoriteProduct, getFavoriteSelector } from '../../redux/slices/favoriteSlice'
import favoriteIcon from '../Header/icons/favorite.png'
import favoriteIcon2 from '../Header/icons/favorite2.png'
import { addNewProductInCart, getCartProductsSelector } from '../../redux/slices/cartSlice'

export function ProductDetail() {
  const { productID } = useParams()
  const dispatch = useDispatch()
  const { token } = useSelector(getUserInfoSelector)
  const favoriteProduct = useSelector(getFavoriteSelector)
  const cartProduct = useSelector(getCartProductsSelector)
  const checkProductInFavorite = favoriteProduct.find((id) => id === productID)
  const checkProductInCart = Object.keys(cartProduct).find((id) => id === productID)
  const addNewProductInCartHandler = () => {
    dispatch(addNewProductInCart(productID))
  }
  const addNewProductInFavoriteHandler = () => {
    dispatch(addFavoriteProduct(productID))
  }
  const deleteProductInFavoriteHandler = () => {
    dispatch(deleteFavoriteProduct(productID))
  }
  const { data: product } = useQuery({
    queryKey: ['product', productID],
    queryFn: () => dogFoodApi.getProductsById(productID, token),
    enabled: !!token,
  })
  if (product) {
    const sumAllRating = product.reviews.reduce((accumulator, currentValue) => accumulator + +currentValue.rating, 0)
    const middleProcentRating = sumAllRating / product.reviews.length
    const discountPrice = product.price * ((100 - product.discount) / 100)

    return (
      <section className={styleProductDetail.ProductDetail}>
        <h1 className={styleProductDetail.title}>{product.name}</h1>
        <div className={styleProductDetail.container}>
          <div className={styleProductDetail.containerLeft}>
            <img src={product.pictures} alt="pictures" />
          </div>
          <div className={styleProductDetail.containerRight}>
            <p>{product.description}</p>
            <p>{product.wight}</p>
            <p>
              Рейтинг:
              {' '}
              {middleProcentRating.toFixed(1)}
              {' '}
              / 5
            </p>
            <p>
              {product.discount ? (
                <span>
                  Скидка:
                  {' '}
                  {product.discount}
                  %
                </span>
              ) : ''}
            </p>
            <div className={styleProductDetail.list}>
              <span className={styleProductDetail.price}>
                ₽
                {' '}
                {product.discount ? (
                  <span>
                    {discountPrice}
                    {' '}
                  </span>
                ) : ''}
                <span className={classNames({ PriceWithDiscount: product.discount })}>
                  {product.price}
                </span>
              </span>
              <div className={styleProductDetail.buttons}>
                {checkProductInFavorite
                  ? <button onClick={deleteProductInFavoriteHandler} type="button"><img width="50px" src={favoriteIcon} alt="icon" /></button>
                  : <button onClick={addNewProductInFavoriteHandler} type="button"><img width="50px" src={favoriteIcon2} alt="icon" /></button>}
                {checkProductInCart
                  ? <Link className={styleProductDetail.btn_cart_after_click} to="../cart"><button type="button">В корзине</button></Link>
                  : <button className={styleProductDetail.btn_cart_before_click} onClick={addNewProductInCartHandler} type="button">Купить</button>}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
