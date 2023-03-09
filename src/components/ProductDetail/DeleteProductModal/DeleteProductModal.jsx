/* eslint-disable no-shadow */
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { dogFoodApi } from '../../../Api/DogFoodApi'
import { deleteProductInCart } from '../../../redux/slices/cartSlice'
import { deleteFavoriteProduct } from '../../../redux/slices/favoriteSlice'
import { getUserInfoSelector } from '../../../redux/slices/userInfoSlice'
import { Modal } from '../../Modal/Modal'
import StyleDeleteProductModal from './DeleteProductModal.module.css'

export function DeleteProductModal({
  isDeleteProductModalOpen,
  setIsDeleteProductModalOpen,
  checkProductInFavorite,
  checkProductInCart,
}) {
  const navigate = useNavigate()
  const { productID } = useParams()
  const { token } = useSelector(getUserInfoSelector)
  const dispatch = useDispatch()

  const { mutateAsync: deleteProductByID } = useMutation({
    mutationFn: (productID) => dogFoodApi.deleteProductById(productID, token),
  })

  const deleteProductByIDHandler = async () => {
    await deleteProductByID(productID)
    if (checkProductInFavorite) {
      dispatch(deleteFavoriteProduct(productID))
    }
    if (checkProductInCart) {
      dispatch(deleteProductInCart(productID))
    }
    navigate('/products')
  }

  const closeDeleteProductModalHandler = () => {
    setIsDeleteProductModalOpen(false)
  }
  return (
    <Modal
      isOpen={isDeleteProductModalOpen}
      closeHandler={setIsDeleteProductModalOpen}
    >
      <div className={StyleDeleteProductModal.DeleteModal}>
        <h3>Вы действительно хотите удалить этот товар?</h3>
        <div className={StyleDeleteProductModal.DeleteModal_buttons}>
          <button type="button" onClick={deleteProductByIDHandler}>Удалить</button>
          <button type="button" onClick={closeDeleteProductModalHandler}>Отмена</button>
        </div>
      </div>
    </Modal>
  )
}
