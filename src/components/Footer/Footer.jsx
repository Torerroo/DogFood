import { Link } from 'react-router-dom'
import { Logo } from '../Logo/Logo'
import './Footer.css'

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
            <a href="Telegram.com"><img src="https://cdn-icons-png.flaticon.com/512/906/906377.png" alt="Telegram" /></a>
            <a href="Whatsapp.com"><img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="Whatsapp" /></a>
            <a href="Viber.com"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111705.png" alt="Viber" /></a>
            <a href="Vk.com"><img src="https://cdn-icons-png.flaticon.com/512/145/145813.png" alt="Vk" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
