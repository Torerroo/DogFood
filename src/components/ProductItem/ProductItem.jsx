import './ProductItem.css'
import { useDispatch } from 'react-redux'
import { addNewProductInCart } from '../../redux/slices/cartSlice'

export function ProductItem({
  id, name, pictures, price,
}) {
  const dispatch = useDispatch()
  const addNewProductInCartHandler = () => {
    dispatch(addNewProductInCart({ id }))
  }
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
        <button onClick={addNewProductInCartHandler} type="button">В корзину</button>
      </div>
    </div>
  )
}
