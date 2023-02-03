import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Logo } from '../Logo/Logo'
import basket from './icons/basket.png'
import favorite from './icons/favorite.png'
import { getTokenSelector, setToken } from '../../redux/slices/getUserTokenSlice'

export function Header() {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { token } = useSelector(getTokenSelector)

  const logoutHandler = () => {
    navigate('/')
    dispatch(setToken(''))
  }
  return (
    <section className="header">
      <div className="header__container">
        <Logo />
        <div className="header__container-search">
          <input className="search-input" type="search" placeholder="Поиск" />
        </div>
        <div className="header__container-menu">
          <Link to="./products">Каталог</Link>
          <Link to="./"><img src={favorite} alt="icon" /></Link>
          <Link to="./"><img src={basket} alt="icon" /></Link>
          <Link to="./signup">Регистрация</Link>
          <Link onClick={logoutHandler} to="./signin">{token ? 'Выход' : 'Вход'}</Link>
        </div>
      </div>
    </section>
  )
}
