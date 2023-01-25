import './ProductItem.css'

export function ProductItem({ product }) {
  return (
    <div className="products__content-item">
      <img
        src={product.pictures}
        alt="product"
      />
      <h3>{product.name}</h3>
      <div>
        <p>{product.wight}</p>
        <p>
          {product.price}
          руб
        </p>
      </div>
      <button type="button">Добавить в корзину</button>
    </div>
  )
}
