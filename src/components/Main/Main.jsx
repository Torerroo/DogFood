import './Main.css'
import courierDog from '../../images/courier-dogs.png'

export function Main() {
  return (
    <main className="main">
      <h1>Магазин DogFood</h1>
      <p>
        {/* Только у нас вы сможете встретить
        {' '}
        <em>таких</em>
        {' '}
        курьеров */}
        Оформите заказ и наши курьеры доставят ваш заказ в этот же день.
      </p>
      <img src={courierDog} alt="courierDog" />
      <p>
        Так же проходит
        {' '}
        <b>акция!</b>
        {' '}
        Если вы понравитесь нашим курьерам,
        то они могут оставить вам бонусный товар.
      </p>
    </main>
  )
}
