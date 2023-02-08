import './Header.css'
import { Link, useNavigate, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Logo } from '../Logo/Logo'
import cart from './icons/cart.png'
import favorite from './icons/favorite.png'
import { getUserTokenSelector, setToken } from '../../redux/slices/getUserTokenSlice'
import { Search } from '../Search/Search'

export function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const match = useMatch('/catalog')

  const { token } = useSelector(getUserTokenSelector)
  const searchVisable = match && token
  const logoutHandler = () => {
    dispatch(setToken(''))
    navigate('/')
  }
  return (
    <section className="header">
      <div className="header__container">
        <Logo />
        {searchVisable ? <Search /> : ''}
        <div className="header__container-menu">
          <Link to="./catalog">Каталог</Link>
          <Link to="./"><img src={favorite} alt="icon" /></Link>
          <Link to="./cart"><img src={cart} alt="icon" /></Link>
          <Link to="./signup">Регистрация</Link>
          <Link onClick={logoutHandler} to="./signin">{token ? 'Выход' : 'Вход'}</Link>
        </div>
      </div>
    </section>
  )
}
