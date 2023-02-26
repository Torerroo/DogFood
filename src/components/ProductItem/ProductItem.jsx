/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
import './ProductItem.css'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { Link, useParams } from 'react-router-dom'
import { addNewProductInCart, deleteProductInCart, getCartProductsSelector } from '../../redux/slices/cartSlice'
import cartIcon from '../Header/icons/cart.png'
import checkIcon from '../Header/icons/check.png'
import favoriteIcon from '../Header/icons/favorite.png'
import favoriteIcon2 from '../Header/icons/favorite2.png'
import { addFavoriteProduct, deleteFavoriteProduct, getFavoriteSelector } from '../../redux/slices/favoriteSlice'

export function ProductItem({
  id, name, pictures, price, discount,
}) {
  const dispatch = useDispatch()

  const cartProduct = useSelector(getCartProductsSelector)
  const favoriteProduct = useSelector(getFavoriteSelector)

  const addNewProductInCartHandler = () => {
    dispatch(addNewProductInCart({ id }))
  }
  const deleteProductInCartHandler = () => {
    dispatch(deleteProductInCart(id))
  }
  const addNewProductInFavoriteHandler = () => {
    dispatch(addFavoriteProduct(id))
  }
  const deleteProductInFavoriteHandler = () => {
    dispatch(deleteFavoriteProduct(id))
  }

  const checkProductInCart = Object.keys(cartProduct).find((productID) => productID === id)
  const checkProductInFavorite = favoriteProduct.find((productID) => productID === id)

  const discountPrice = price * ((100 - discount) / 100)
  return (
    <div className="product-item">
      <img src={pictures} alt="product" />
      <div className="product-list">
        <h3>{name}</h3>
        <div className="product-list-price">
          ₽
          {' '}
          {discount ? (
            <span>
              {discountPrice}
              {' '}
            </span>
          ) : ''}
          <span className={classNames({ PriceWithDiscount: discount })}>
            {price}
          </span>
        </div>
        <div className="product-list-buttons">
          {checkProductInCart
            ? <button className="product-list-btn-cart" type="button"><img src={checkIcon} onClick={deleteProductInCartHandler} alt="icon" /></button>
            : <button className="product-list-btn-cart" type="button"><img src={cartIcon} onClick={addNewProductInCartHandler} alt="icon" /></button>}
          {checkProductInFavorite
            ? <button className="product-list-btn-favorite" onClick={deleteProductInFavoriteHandler} type="button"><img src={favoriteIcon} alt="icon" /></button>
            : <button className="product-list-btn-favorite" onClick={addNewProductInFavoriteHandler} type="button"><img src={favoriteIcon2} alt="icon" /></button>}
        </div>
        <Link to={`../products/${id}`}>Подробнее</Link>
      </div>
    </div>
  )
}
