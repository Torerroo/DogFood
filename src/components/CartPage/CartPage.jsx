/* eslint-disable no-underscore-dangle */
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { clearCart, getCartProductsSelector } from '../../redux/slices/cartSlice'
import { getUserTokenSelector } from '../../redux/slices/getUserTokenSlice'
import './CartPage.css'
import { CartItem } from '../CartItem/CartItem'
import { withQuery } from '../HOCs/withQuery'

function CartPageInner({
  token, ids, products, clearCartHandler,
}) {
  if (!token) {
    return (
      <section className="Cart">
        <div className="cart__container-auth">
          <h1>
            Вы не авторизованы, чтобы увидеть корзину необходимо
            {' '}

            <Link to="/signin">Войти</Link>
            .
          </h1>
        </div>
      </section>
    )
  }
  if (ids.length === 0) {
    return (
      <section className="cart">
        <div className="cart__container-empty">
          <h1>Корзина пуста</h1>
          <Link to="/">На главную</Link>
          <Link to="/catalog">Каталог</Link>
        </div>
      </section>
    )
  }
  if (products) {
    return (
      <section className="cart">
        <div className="cart__container">
          <h1>Корзина</h1>
          <button onClick={clearCartHandler} className="clearCartHandler" type="button">Очистить корзину</button>
          <div className="cart__container-content">
            <div className="cart-tab-products-list">
              {products.map((product) => (
                <CartItem
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  pictures={product.pictures}
                  description={product.description}
                  discount={product.discount}
                  stock={product.stock}
                  wight={product.wight}
                />
              ))}
            </div>
            <div className="cart-tab-total-amount">
              <h3>Условия заказа</h3>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const CartPageInnerWithQuery = withQuery(CartPageInner)

export function CartPage() {
  const { token } = useSelector(getUserTokenSelector)
  const cart = useSelector(getCartProductsSelector)
  const dispatch = useDispatch()
  const ids = Object.keys(cart)

  const { data: products, isLoading } = useQuery({
    queryKey: ['cart', cart],
    queryFn: () => dogFoodApi.getProductsByIds(ids, token),
  })

  const clearCartHandler = () => {
    dispatch(clearCart())
  }

  return (
    <CartPageInnerWithQuery
      products={products}
      token={token}
      ids={ids}
      isLoading={isLoading}
      clearCartHandler={clearCartHandler}
    />
  )
}
