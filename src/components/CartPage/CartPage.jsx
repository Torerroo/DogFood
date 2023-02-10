import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { getCartProductsSelector } from '../../redux/slices/cartSlice'
import { getUserTokenSelector } from '../../redux/slices/getUserTokenSlice'
import './CartPage.css'

export function CartPage() {
  const { token } = useSelector(getUserTokenSelector)
  const cart = useSelector(getCartProductsSelector)
  const ids = Object.keys(cart)
  if (!token) {
    return (
      <section className="Cart">
        <div className="cart__container-auth">
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

  const { data: products } = useQuery({
    queryKey: ['cart', cart],
    queryFn: () => dogFoodApi.getProductsByIds(ids, token),
  })
  console.log(products)

  return (
    <section className="Cart">
      <div className="cart__container">
        <h1>Корзина</h1>
      </div>
    </section>
  )
}
