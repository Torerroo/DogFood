import './ProductItem.css'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { addNewProductInCart, getCartProductsSelector } from '../../redux/slices/cartSlice'
import cartIcon from '../Header/icons/cart.png'
import checkIcon from '../Header/icons/check.png'
import favoriteIcon from '../Header/icons/favorite.png'

export function ProductItem({
  id, name, pictures, price, discount,
}) {
  const dispatch = useDispatch()
  const cartProduct = useSelector(getCartProductsSelector)
  const addNewProductInCartHandler = () => {
    dispatch(addNewProductInCart({ id }))
  }
  const tagProductInCart = Object.keys(cartProduct).find((productID) => productID === id)
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
          <button className="product-list-btn-cart" onClick={addNewProductInCartHandler} type="button">{tagProductInCart ? <img src={checkIcon} alt="icon" /> : <img src={cartIcon} alt="icon" />}</button>
          <button className="product-list-btn-favorite" type="button"><img src={favoriteIcon} alt="icon" /></button>
        </div>
      </div>
    </div>
  )
}
