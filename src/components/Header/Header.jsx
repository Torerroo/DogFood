import './Header.css'
import { Link, useNavigate, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Logo } from '../Logo/Logo'
import cartIcon from './icons/cart.png'
import favoriteIcon from './icons/favorite.png'
import { getUserTokenSelector, setToken } from '../../redux/slices/getUserTokenSlice'
import { Search } from '../Search/Search'
import { clearCart, getCartProductsSelector } from '../../redux/slices/cartSlice'

export function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const match = useMatch('/catalog')

  const { token } = useSelector(getUserTokenSelector)

  const cart = useSelector(getCartProductsSelector)
  const cartLength = Object.keys(cart).length
  const searchVisable = match && token

  const logoutHandler = () => {
    dispatch(setToken(''))
    dispatch(clearCart())
    navigate('/')
  }
  return (
    <section className="header">
      <div className="header__container">
        <Logo />
        {searchVisable ? <Search /> : ''}
        <div className="header__container-menu">
          <Link to="./catalog">Каталог</Link>
          <Link to="./"><img src={favoriteIcon} alt="icon" /></Link>
          <Link to="./cart" className="header__menu-cart">
            <img src={cartIcon} alt="icon" />
            {cartLength ? <span className="header__menu-cartLength">{cartLength}</span> : ''}
          </Link>
          <Link to="./signup">Регистрация</Link>
          <Link onClick={logoutHandler} to="./signin">{token ? 'Выход' : 'Вход'}</Link>
        </div>
      </div>
    </section>
  )
}
