import { useParams } from 'react-router-dom'

export function ProductDetail() {
  const { productID } = useParams()
  console.log(productID)
  return <div>123</div>
}
