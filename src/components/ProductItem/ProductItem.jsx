import './ProductItem.css'

export function ProductItem({ product }) {
  return (
    <div className="product-item">
      <img src={product.pictures} alt="product" />
      <div className="product-list">
        <h3>{product.name}</h3>
        <span className="price">
          ₽
          {' '}
          {product.price}
        </span>
        <button type="button">В корзину</button>
      </div>
    </div>
  )
}
