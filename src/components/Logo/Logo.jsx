import { Link } from 'react-router-dom'
import './Logo.css'
import dog from './Dog.jpg'

export function Logo() {
  return (
    <div className="logo">
      <Link to="./">
        <img src={dog} alt="Dog" />
        <span>DogFood</span>
      </Link>
    </div>
  )
}
