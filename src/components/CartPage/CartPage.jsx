/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { changeAllStatusOnTrue, clearCart, getCartProductsSelector } from '../../redux/slices/cartSlice'
import { getUserTokenSelector } from '../../redux/slices/getUserTokenSlice'
import './CartPage.css'
import { CartItem } from '../CartItem/CartItem'
import { withQuery } from '../HOCs/withQuery'

function CartPageInner({
  token, ids, products, clearCartHandler, isCheckedHandler,
  getSumPriceAllProducts, getSumCountAllProducts,
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
          <div className="cart__container-handlers">
            <button onClick={isCheckedHandler} className="isCheckedHandler" type="button">Выбрать все</button>
            <button onClick={clearCartHandler} className="clearCartHandler" type="button">Очистить корзину</button>
          </div>
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
            {getSumCountAllProducts()
              ? (
                <div className="cart-tab-total-amount">
                  <h3>Условия заказа</h3>
                  <hr />
                  <div>
                    <p>Итого:</p>
                    <div>
                      <p>
                        {getSumCountAllProducts()}
                        {getSumCountAllProducts() === 1 ? ' товар' : ''}
                        {getSumCountAllProducts() > 1 && getSumCountAllProducts() < 5 ? ' товара' : ''}
                        {getSumCountAllProducts() > 4 ? ' товаров' : ''}
                      </p>
                      <p>
                        {getSumPriceAllProducts()}
                        {' '}
                        ₽
                      </p>
                    </div>
                  </div>
                  <button type="button">Перейти к оформлению</button>
                </div>
              )
              : (
                <div className="cart-tab-total-amount-withoutProduct">
                  <h3>Выберите товары, чтобы перейти к оформлению</h3>
                  <button onClick={isCheckedHandler} className="isCheckedHandler" type="button">Выбрать все</button>
                </div>
              )}
          </div>
        </div>
      </section>
    )
  }
}

const CartPageInnerWithQuery = withQuery(CartPageInner)

export function CartPage() {
  const { token } = useSelector(getUserTokenSelector)
  const dispatch = useDispatch()
  const cart = useSelector(getCartProductsSelector)
  const ids = Object.keys(cart)
  const clearCartHandler = () => {
    dispatch(clearCart())
  }
  const isCheckedHandler = () => {
    ids.map((id) => dispatch(changeAllStatusOnTrue(id)))
  }

  const { data: products, isLoading } = useQuery({
    queryKey: ['cart', ids],
    queryFn: () => dogFoodApi.getProductsByIds(ids, token),
  })

  const getSumPriceAllProducts = () => {
    if (products) {
      let sumAllProduct = 0
      products.map((product) => {
        if (cart[product._id].isChecked) {
          const { count } = cart[product._id]
          if (product.discount) {
            const discountPrice = product.price * ((100 - product.discount) / 100)
            sumAllProduct += discountPrice * count
          } else {
            sumAllProduct += product.price * count
          }
          return sumAllProduct
        }
      })
      return (sumAllProduct)
    }
  }

  const getSumCountAllProducts = () => {
    if (products) {
      let sumCount = 0
      products.map((product) => {
        if (cart[product._id].isChecked) {
          sumCount += cart[product._id].count
        }
      })
      return sumCount
    }
    return 0
  }

  return (
    <CartPageInnerWithQuery
      products={products}
      token={token}
      ids={ids}
      isLoading={isLoading}
      clearCartHandler={clearCartHandler}
      isCheckedHandler={isCheckedHandler}
      getSumPriceAllProducts={getSumPriceAllProducts}
      getSumCountAllProducts={getSumCountAllProducts}
    />
  )
}
