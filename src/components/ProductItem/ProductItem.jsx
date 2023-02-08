import './ProductItem.css'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProductInCart, getCartProductsSelector } from '../../redux/slices/cartSlice'
import cartIcon from '../Header/icons/cart.png'
import checkIcon from '../Header/icons/check.png'

export function ProductItem({
  id, name, pictures, price,
}) {
  const dispatch = useDispatch()
  const cartProduct = useSelector(getCartProductsSelector)
  const addNewProductInCartHandler = () => {
    dispatch(addNewProductInCart({ id }))
  }

  const tagProductInCart = Object.keys(cartProduct).find((productID) => productID === id)

  return (
    <div className="product-item">
      <img src={pictures} alt="product" />
      <div className="product-list">
        <h3>{name}</h3>
        <span className="price">
          ₽
          {' '}
          {price}
        </span>
        <button onClick={addNewProductInCartHandler} type="button">{tagProductInCart ? <img src={checkIcon} alt="icon" /> : <img src={cartIcon} alt="icon" />}</button>
      </div>
    </div>
  )
}
