import './Main.css'
import courierDog from '../../images/courier-dogs.jfif'

export function Main() {
  return (
    <main className="main">
      <h1>Магазин DogFood</h1>
      <p>
        Только у нас вы сможете встретить
        {' '}
        <em>таких</em>
        {' '}
        курьеров
      </p>
      <img src={courierDog} alt="courierDog" />
    </main>
  )
}
