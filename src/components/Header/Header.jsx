import './Header.css'
import { Link, useNavigate, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Logo } from '../Logo/Logo'
import cartIcon from './icons/cart.png'
import favoriteIcon from './icons/favorite.png'
import account from './icons/account.png'
import { getUserInfoSelector, resetUserInfo } from '../../redux/slices/userInfoSlice'
import { Search } from '../Search/Search'
import { getCartProductsSelector } from '../../redux/slices/cartSlice'
import { getFavoriteSelector } from '../../redux/slices/favoriteSlice'

export function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const match = useMatch('/catalog')
  const { token } = useSelector(getUserInfoSelector)
  const cart = useSelector(getCartProductsSelector)
  const favorite = useSelector(getFavoriteSelector)
  const cartLength = Object.keys(cart).length
  const favoriteLength = favorite.length
  const searchVisable = match && token

  const logoutHandler = () => {
    dispatch(resetUserInfo())
    navigate('/')
  }
  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        {searchVisable ? <Search /> : ''}
        <div className="header__container-menu">
          <Link to="./catalog">Каталог</Link>
          <Link to="./favorites" className="header__menu-favorite">
            <img src={favoriteIcon} alt="icon" />
            {favoriteLength ? <span className="header__menu-favoriteLength">{favoriteLength}</span> : ''}
          </Link>
          <Link to="./cart" className="header__menu-cart">
            <img src={cartIcon} alt="icon" />
            {cartLength ? <span className="header__menu-cartLength">{cartLength}</span> : ''}
          </Link>
          {token ? <Link to="./account"><img src={account} alt="account" /></Link> : <Link to="./signup">Регистрация</Link>}
          <Link onClick={logoutHandler} to="./signin">{token ? 'Выход' : 'Вход'}</Link>
        </div>
      </div>
    </header>
  )
}
