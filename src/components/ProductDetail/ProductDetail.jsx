/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { useState } from 'react'
import { getUserInfoSelector } from '../../redux/slices/userInfoSlice'
import { dogFoodApi } from '../../Api/DogFoodApi'
import styleProductDetail from './ProductDetail.module.css'
import { addFavoriteProduct, deleteFavoriteProduct, getFavoriteSelector } from '../../redux/slices/favoriteSlice'
import favoriteIcon from '../Header/icons/favorite.png'
import favoriteIcon2 from '../Header/icons/favorite2.png'
import { addNewProductInCart, getCartProductsSelector } from '../../redux/slices/cartSlice'
import { withQuery } from '../HOCs/withQuery'
import { AddNewReviewModal } from './AddNewReviewModal/AddNewReviewModal'
import basket from '../Header/icons/basket.png'
import { DeleteProductModal } from './DeleteProductModal/DeleteProductModal'

function ProductDetailInner({
  product,
  reviews,
  addNewProductInCartHandler,
  addNewProductInFavoriteHandler,
  deleteProductInFavoriteHandler,
  checkProductInFavorite,
  checkProductInCart,
  user,
  deleteReviewHandler,
  deleteProductByIDHandler,
}) {
  const dataReview = (currentData) => {
    const data = currentData.slice(0, 10)
    return data
  }
  const [isAddNewReviewModalOpen, setIsAddNewReviewModalOpen] = useState(false)
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false)

  const openAddNewReviewModalHandler = () => {
    setIsAddNewReviewModalOpen(true)
  }
  const openDeleteProductModalHandler = () => {
    setIsDeleteProductModalOpen(true)
  }

  if (product && reviews) {
    const sumAllRating = product.reviews.reduce((accumulator, currentValue) => accumulator + +currentValue.rating, 0)
    const middleProcentRating = sumAllRating / product.reviews.length
    const discountPrice = product.price * ((100 - product.discount) / 100)
    return (
      <section className={styleProductDetail.ProductDetail}>
        <h1 className={styleProductDetail.title}>{product.name}</h1>
        <div className={styleProductDetail.containerInfo}>
          <div className={styleProductDetail.containerLeft}>
            <img src={product.pictures} alt="pictures" />
          </div>
          <div className={styleProductDetail.containerRight}>
            <p>{product.description}</p>
            <p>{product.wight}</p>
            {product.reviews.length ? (
              <p>
                Рейтинг:
                {' '}
                {middleProcentRating.toFixed(1)}
                {' '}
                / 5
              </p>
            ) : ''}
            <p>
              {product.discount ? (
                <span>
                  Скидка:
                  {' '}
                  {product.discount}
                  %
                </span>
              ) : ''}
            </p>
            <div className={styleProductDetail.list}>
              <span className={styleProductDetail.price}>
                ₽
                {' '}
                {product.discount ? (
                  <span>
                    {discountPrice}
                    {' '}
                  </span>
                ) : ''}
                <span className={classNames({ PriceWithDiscount: product.discount })}>
                  {product.price}
                </span>
              </span>
              <div className={styleProductDetail.buttons}>
                {checkProductInFavorite
                  ? <button onClick={deleteProductInFavoriteHandler} type="button"><img width="50px" src={favoriteIcon} alt="icon" /></button>
                  : <button onClick={addNewProductInFavoriteHandler} type="button"><img width="50px" src={favoriteIcon2} alt="icon" /></button>}
                {checkProductInCart
                  ? <Link className={styleProductDetail.btn_cart_click} to="../cart"><button type="button">В корзине</button></Link>
                  : <button className={styleProductDetail.btn_cart_click} onClick={addNewProductInCartHandler} type="button">Купить</button>}
              </div>
            </div>
            <div className={styleProductDetail.Host_buttons}>
              {product.author._id === user.id ? <button type="button" onClick={openDeleteProductModalHandler}>Удалить товар</button> : ''}
              {product.author._id === user.id ? <button type="button">Редактировать</button> : ''}
            </div>
          </div>
        </div>
        <div className={styleProductDetail.containerComments}>
          <h3>
            Отзывы о
            {' '}
            &quot;
            {product.name}
            &quot;
          </h3>
          <button onClick={openAddNewReviewModalHandler} type="button">Добавить отзыв</button>
          {[...reviews].reverse().map((review) => (
            <div className={styleProductDetail.reviewsList} key={review._id}>
              <p>
                <span>Пользователь:</span>
                {' '}
                {review.author.name}
              </p>
              <p>
                <span>Рейтинг:</span>
                {' '}
                {review.rating}
                /5
              </p>
              <p>
                <span>Комментарий:</span>
                {' '}
                {review.text}
              </p>
              <p className={styleProductDetail.dataReview}>{dataReview(review.created_at)}</p>
              {review.author._id === user.id ? <span onClick={() => deleteReviewHandler(review._id)} className={styleProductDetail.deleteReview}><img src={basket} alt="basket" /></span> : ''}
            </div>
          ))}
        </div>
        <AddNewReviewModal
          isAddNewReviewModalOpen={isAddNewReviewModalOpen}
          setIsAddNewReviewModalOpen={setIsAddNewReviewModalOpen}
        />
        <DeleteProductModal
          isDeleteProductModalOpen={isDeleteProductModalOpen}
          setIsDeleteProductModalOpen={setIsDeleteProductModalOpen}
          deleteProductByIDHandler={deleteProductByIDHandler}
        />
      </section>
    )
  }
}

const ProductDetailWithQuery = withQuery(ProductDetailInner)

export function ProductDetail() {
  const { productID } = useParams()
  const dispatch = useDispatch()
  const { token } = useSelector(getUserInfoSelector)
  const user = useSelector(getUserInfoSelector)
  const favoriteProduct = useSelector(getFavoriteSelector)
  const cartProduct = useSelector(getCartProductsSelector)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const checkProductInFavorite = favoriteProduct.find((id) => id === productID)
  const checkProductInCart = Object.keys(cartProduct).find((id) => id === productID)

  const addNewProductInCartHandler = () => {
    dispatch(addNewProductInCart(productID))
  }
  const addNewProductInFavoriteHandler = () => {
    dispatch(addFavoriteProduct(productID))
  }
  const deleteProductInFavoriteHandler = () => {
    dispatch(deleteFavoriteProduct(productID))
  }
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productID],
    queryFn: () => dogFoodApi.getProductsById(productID, token),
    enabled: !!token,
  })
  const { data: reviews } = useQuery({
    queryKey: ['reviews', productID],
    queryFn: () => dogFoodApi.getAllReviewsByProductId(productID, token),
    enabled: !!token,
  })
  const { mutateAsync: deleteReviewById } = useMutation({
    mutationFn: (reviewID) => dogFoodApi.deleteProductReviewById(productID, reviewID, token),
  })

  const deleteReviewHandler = async (reviewID) => {
    await deleteReviewById(reviewID)
    queryClient.invalidateQueries(['product'])
    queryClient.invalidateQueries(['reviews'])
  }

  const { mutateAsync: deleteProductByID } = useMutation({
    mutationFn: (productID) => dogFoodApi.deleteProductById(productID, token),
  })

  const deleteProductByIDHandler = async () => {
    await deleteProductByID(productID)
    navigate('/products')
  }

  return (
    <ProductDetailWithQuery
      isLoading={isLoading}
      product={product}
      reviews={reviews}
      checkProductInFavorite={checkProductInFavorite}
      checkProductInCart={checkProductInCart}
      addNewProductInCartHandler={addNewProductInCartHandler}
      addNewProductInFavoriteHandler={addNewProductInFavoriteHandler}
      deleteProductInFavoriteHandler={deleteProductInFavoriteHandler}
      user={user}
      deleteReviewHandler={deleteReviewHandler}
      deleteProductByIDHandler={deleteProductByIDHandler}
    />
  )
}
