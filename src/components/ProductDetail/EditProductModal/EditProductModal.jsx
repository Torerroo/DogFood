/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { dogFoodApi } from '../../../Api/DogFoodApi'
import { getUserInfoSelector } from '../../../redux/slices/userInfoSlice'
import { Modal } from '../../Modal/Modal'
import styleAddProductModal from '../../Header/AddNewProductModal/AddNewProductModal.module.css'
import { validatorAddNewProductModal } from '../../Header/AddNewProductModal/validatorAddNewProductModal'

export function EditProductModal({ isEditProductModalOpen, setIsEditProductModalOpen, product }) {
  const { token } = useSelector(getUserInfoSelector)
  const { productID } = useParams()
  const queryClient = useQueryClient()
  const closeEditProductModalHandler = () => {
    setIsEditProductModalOpen(false)
  }

  const initialValues = {
    pictures: product.pictures,
    name: product.name, // обязательное поле
    price: product.price, // обязательное поле
    description: product.description, // обязательное поле
    wight: product.wight,
    discount: product.discount,
    stock: product.stock,
    available: product.available,
  }

  const { mutateAsync: EditProduct, isError, error } = useMutation({
    mutationFn: (values) => dogFoodApi.editProductById(productID, token, values),
  })

  const submitHandler = async (values) => {
    await EditProduct(values)
    queryClient.invalidateQueries(['product'])
    closeEditProductModalHandler()
  }

  return (
    <Modal isOpen={isEditProductModalOpen} closeHandler={closeEditProductModalHandler}>
      <Formik
        initialValues={initialValues}
        validationSchema={validatorAddNewProductModal}
        onSubmit={submitHandler}
      >
        <Form className={styleAddProductModal.form}>
          <h2>Редактирование товара</h2>
          <div>
            <label htmlFor="pictures">Фото товара(URL)</label>
            <Field name="pictures" type="text" />
            <ErrorMessage component="p" name="pictures" />
          </div>
          <div>
            <label htmlFor="name">Название</label>
            <Field name="name" type="text" />
            <ErrorMessage component="p" name="name" />
          </div>
          <div>
            <label htmlFor="price">Цена</label>
            <Field name="price" type="number" />
            <ErrorMessage component="p" name="price" />
          </div>
          <div>
            <label htmlFor="description">Описание</label>
            <Field name="description" type="text" />
            <ErrorMessage component="p" name="description" />
          </div>
          <div>
            <label htmlFor="wight">Вес</label>
            <Field name="wight" type="text" />
            <ErrorMessage component="p" name="wight" />
          </div>
          <div>
            <label htmlFor="discount">Размер скидки</label>
            <Field name="discount" type="number" />
            <ErrorMessage component="p" name="discount" />
          </div>
          <div>
            <label htmlFor="stock">Наличие, ед.</label>
            <Field name="stock" type="number" />
            <ErrorMessage component="p" name="stock" />
          </div>
          <button type="submit">Изменить</button>
          {isError && (
          <p className="SignInPage-error">
            {error.message}
          </p>
          )}
        </Form>
      </Formik>
    </Modal>
  )
}
