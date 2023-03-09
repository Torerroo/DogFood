import { useDispatch } from 'react-redux'
import { deleteProductInCart } from '../../../redux/slices/cartSlice'
import { Modal } from '../../Modal/Modal'
import StyleDeleteProductModal from './DeleteProductFromCartModal.module.css'

export function DeleteProductFromCartModal({
  isDeleteProductFromCartModalOpen,
  setIsDeleteProductFromCartModalOpen,
  id,
}) {
  const dispatch = useDispatch()

  const closeDeleteProductModalHandler = () => {
    setIsDeleteProductFromCartModalOpen(false)
  }

  const deleteProductFromCart = () => {
    dispatch(deleteProductInCart(id))
  }

  return (
    <Modal
      isOpen={isDeleteProductFromCartModalOpen}
      closeHandler={setIsDeleteProductFromCartModalOpen}
    >
      <div className={StyleDeleteProductModal.DeleteModal}>
        <h3>Удалить товар из корзины?</h3>
        <div className={StyleDeleteProductModal.DeleteModal_buttons}>
          <button type="button" onClick={deleteProductFromCart}>Удалить</button>
          <button type="button" onClick={closeDeleteProductModalHandler}>Отмена</button>
        </div>
      </div>
    </Modal>
  )
}
