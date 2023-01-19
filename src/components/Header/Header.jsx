import './Header.css'
import { Link } from 'react-router-dom'
import { Logo } from '../Logo/Logo'

export function Header() {
  function inputValueClear() {
    document.querySelector('.search-input').value = ''
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
          <Link to="./products">Товары</Link>
          <Link to="./"><img src="https://s1.iconbird.com/ico/2013/3/637/w128h128139396832520.png" alt="" /></Link>
          <Link to="./"><img src="https://cdn-icons-png.flaticon.com/512/8/8109.png" alt="" /></Link>
          <Link to="./signup">Регистрация</Link>
          <Link to="./signin">Войти</Link>
        </div>
      </div>
    </section>
  )
}
