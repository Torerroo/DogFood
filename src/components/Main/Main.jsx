import { Link } from 'react-router-dom'
import './Main.css'

export function Main() {
  return (
    <section className="main">
      <h1>Магазин DogFood</h1>
      <Link to="./signin">Войдите для просмотра товаров</Link>
    </section>
  )
}
