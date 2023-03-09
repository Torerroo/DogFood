/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './Header.css'
import {
  useNavigate, useMatch, NavLink,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Logo } from '../Logo/Logo'
import cartIcon from './icons/cart.png'
import favoriteIcon from './icons/favorite.png'
import account from './icons/account.png'
import addProduct from './icons/addProduct.png'
import { getUserInfoSelector, resetUserInfo } from '../../redux/slices/userInfoSlice'
import { Search } from '../Search/Search'
import { getCartProductsSelector, resetCartInfo } from '../../redux/slices/cartSlice'
import { getFavoriteSelector, resetFavoriteInfo } from '../../redux/slices/favoriteSlice'
import { AddNewProductModal } from './AddNewProductModal/AddNewProductModal'

export function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const match = useMatch('/products')
  const { token } = useSelector(getUserInfoSelector)
  const cart = useSelector(getCartProductsSelector)
  const favorite = useSelector(getFavoriteSelector)
  const cartLength = Object.keys(cart).length
  const favoriteLength = favorite.length
  const searchVisable = match && token

  const logoutHandler = () => {
    dispatch(resetUserInfo())
    dispatch(resetFavoriteInfo())
    dispatch(resetCartInfo())
    navigate('/')
  }

  const [isAddNewProductModalOpen, setIsAddNewProductModalOpen] = useState(false)

  const openAddNewProductModalHandler = () => {
    setIsAddNewProductModalOpen(true)
  }
  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        {searchVisable ? <Search /> : ''}
        <div className="header__container-menu">
          {token ? (
            <img
              className="header__menu-addProduct"
              onClick={openAddNewProductModalHandler}
              src={addProduct}
              alt="addProduct"
            />
          ) : ''}
          <NavLink to="./products">Каталог</NavLink>
          <NavLink to="./favorites" className="header__menu-favorite">
            <img src={favoriteIcon} alt="icon" />
            {favoriteLength ? <span className="header__menu-favoriteLength">{favoriteLength}</span> : ''}
          </NavLink>
          <NavLink to="./cart" className="header__menu-cart">
            <img src={cartIcon} alt="icon" />
            {cartLength ? <span className="header__menu-cartLength">{cartLength}</span> : ''}
          </NavLink>
          {token ? <NavLink to="./account"><img src={account} alt="account" /></NavLink> : <NavLink to="./signup">Регистрация</NavLink>}
          <NavLink onClick={logoutHandler} to="./signin">{token ? 'Выход' : 'Вход'}</NavLink>
        </div>
      </div>
      <AddNewProductModal
        isAddNewProductModalOpen={isAddNewProductModalOpen}
        setIsAddNewProductModalOpen={setIsAddNewProductModalOpen}
      />
    </header>
  )
}
