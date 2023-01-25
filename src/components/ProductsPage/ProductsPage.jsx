import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TokenContext } from '../Contexts/TokenContextProvider'
import { ProductItem } from '../ProductItem/ProductItem'
import './ProductsPage.css'

export function ProductsPage() {
  const { token } = useContext(TokenContext)

  if (!token) {
    return (
      <section className="products__container">
        <div className="products__container-auth">
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
    queryKey: ['User', token],
    queryFn: () => fetch('https://api.react-learning.ru/products', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status >= 400 && res.status < 500) {
        throw new Error(`Произошла ошибка при входе в Личный кабинет. 
      Проверьте отправляемые данные. Status: ${res.status}`)
      }

      if (res.status >= 500) {
        throw new Error(`Произошла ошибка при получении ответа от сервера. 
      Попробуйте сделать запрос позже. Status: ${res.status}`)
      }

      return res.json()
    }).then((res) => res.products),
  })

  if (products) {
    return (
      <section className="products">
        <div className="products__container">
          <h1 className="products__container-head">Все товары</h1>
          <div className="products__container-content">
            {products.map((product) => (
              <ProductItem
                // eslint-disable-next-line no-underscore-dangle
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }
}
