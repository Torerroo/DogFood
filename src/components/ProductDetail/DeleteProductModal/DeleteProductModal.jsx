import { Modal } from '../../Modal/Modal'
import StyleDeleteProductModal from './DeleteProductModal.module.css'

export function DeleteProductModal({
  isDeleteProductModalOpen,
  setIsDeleteProductModalOpen,
  deleteProductByIDHandler,
}) {
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
