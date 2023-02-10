import { useDispatch, useSelector } from 'react-redux'
import {
  countDecrement, countIncrement, deleteProductInCart, getCartProductsSelector,
} from '../../redux/slices/cartSlice'
import './CartItem.css'

export function CartItem({
  name, pictures, price, wight, stock, discount, description, id,
}) {
  const discountPrice = price * ((100 - discount) / 100)

  const cart = useSelector(getCartProductsSelector)
  const { count } = cart[id]

  const dispatch = useDispatch()

  const countIncrementHandler = () => {
    if (count < stock) {
      dispatch(countIncrement(id))
    }
  }

  const countDecrementHandler = () => {
    if (count === 1) {
      return dispatch(deleteProductInCart(id))
    }
    return dispatch(countDecrement(id))
  }

  const priceForStock = price * count
  const discountPriceForStock = discountPrice * count

  return (
    <div className="cart-item">
      <div className="cart-item-left-info">
        <div className="cart-left-info-img">
          <img src={pictures} alt="product" />
        </div>
        <div className="cart-left-info-wight">
          {wight}
        </div>
        {discount ? (
          <div className="cart-left-info-discount">
            Скидка
            {' '}
            {discount}
            %
          </div>
        ) : ''}
        <div className="cart-left-info-price">
          Цена:
          <div className={discount ? 'cart-price-active' : ''}>
            {priceForStock}
            {' '}
            ₽
          </div>
          {discount ? (
            <div>
              {discountPriceForStock}
              {' '}
              ₽
            </div>
          ) : ''}
        </div>
      </div>
      <div className="cart-item-right-info">
        <div className="cart-right-info-name">
          <h2>{name}</h2>
          <p>
            В наличии:
            {' '}
            {stock}
            {' '}
            штук
            {' '}
          </p>
        </div>
        <div className="cart-right-info-stock">
          <button onClick={countDecrementHandler} type="button">-</button>
          <span>{count}</span>
          <button onClick={countIncrementHandler} type="button">+</button>
        </div>
        <div className="cart-right-info-description">{description}</div>
      </div>
    </div>
  )
}
