import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Logo } from '../Logo/Logo'
import { TokenContext } from '../Contexts/TokenContextProvider'

export function Header() {
  const navigate = useNavigate()
  function inputValueClear() {
    document.querySelector('.search-input').value = ''
  }
  const { token, setToken } = useContext(TokenContext)

  const logoutHandler = () => {
    setToken('')
    navigate('/')
  }
  return (
    <section className="header">
      <div className="header__container">
        <Logo />
        <div className="header__container-search">
          <input className="search-input" type="text" placeholder="Поиск" />
          <button onClick={inputValueClear} type="button">&times;</button>
        </div>
        <div className="header__container-menu">
          <Link to="./products">Каталог</Link>
          <Link to="./"><img src="https://s1.iconbird.com/ico/2013/3/637/w128h128139396832520.png" alt="icon" /></Link>
          <Link to="./"><img src="https://cdn-icons-png.flaticon.com/512/8/8109.png" alt="icon" /></Link>
          <Link to="./signup">Регистрация</Link>
          <Link onClick={logoutHandler} to="./signin">{token ? 'Выход' : 'Вход'}</Link>
        </div>
      </div>
    </section>
  )
}
