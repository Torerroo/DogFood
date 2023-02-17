import { Link } from 'react-router-dom'
import { Logo } from '../Logo/Logo'
import './Footer.css'
import telegram from './icons/telegram.png'
import whatsapp from './icons/whatsapp.png'
import viber from './icons/viber.png'
import vk from './icons/vk.png'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__container-logo">
          <Logo />
          <p>Ⓒ«Интернет-магазин DogFood.ru»</p>
        </div>
        <div className="footer__container-menu">
          <Link to="./catalog">Каталог</Link>
          <Link to="./">Акции</Link>
          <Link to="./">Новости</Link>
          <Link to="./">Отзывы</Link>
        </div>
        <div className="footer__container-menu">
          <Link to="./">Оплата и доставка</Link>
          <Link to="./">Часто спрашивают</Link>
          <Link to="./">Обратная связь</Link>
          <Link to="./">Контакты</Link>
        </div>
        <div className="footer__container-contacts">
          <p>Мы на связи</p>
          <p>8 (999) 00-00-00</p>
          <p>dogfood@gmail.com</p>
          <div className="footer-contacts__message">
            <a href="https://telegram.org/" target="_blank" rel="noreferrer"><img src={telegram} alt="telegram" /></a>
            <a href="https://whatsapp.com/" target="_blank" rel="noreferrer"><img src={whatsapp} alt="whatsapp" /></a>
            <a href="https://viber.com/" target="_blank" rel="noreferrer"><img src={viber} alt="viber" /></a>
            <a href="https://vk.com/" target="_blank" rel="noreferrer"><img src={vk} alt="vk" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
