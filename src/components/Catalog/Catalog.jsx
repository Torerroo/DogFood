import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserInfoSelector } from '../../redux/slices/userInfoSlice'
import { Filters } from '../Filters/Filters'
import { ProductsPage } from '../ProductsPage/ProductsPage'
import './Catalog.css'

export function Catalog() {
  const { token } = useSelector(getUserInfoSelector)

  if (!token) {
    return (
      <section className="products">
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
  if (token) {
    return (
      <>
        <h1 className="products__container-head">Все товары</h1>
        <Filters />
        ,
        <ProductsPage />
      </>
    )
  }
}
