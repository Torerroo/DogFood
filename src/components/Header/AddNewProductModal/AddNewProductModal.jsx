/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useSelector } from 'react-redux'
import { dogFoodApi } from '../../../Api/DogFoodApi'
import { getUserInfoSelector } from '../../../redux/slices/userInfoSlice'
import { Modal } from '../../Modal/Modal'
import styleAddProductModal from './AddNewProductModal.module.css'
import { validatorAddNewProductModal } from './validatorAddNewProductModal'

export function AddNewProductModal({ isAddNewProductModalOpen, setIsAddNewProductModalOpen }) {
  const { token } = useSelector(getUserInfoSelector)
  const queryClient = useQueryClient()
  const closeAddNewProductModalHandler = () => {
    setIsAddNewProductModalOpen(false)
  }

  const initialValues = {
    pictures: '',
    name: '', // обязательное поле
    price: 0, // обязательное поле
    description: '', // обязательное поле
    wight: '',
    discount: 0,
    stock: 0,
    available: true,
  }

  const { mutateAsync: addNewProduct, isError, error } = useMutation({
    mutationFn: (values) => dogFoodApi.addNewProduct(values, token),
  })

  const submitHandler = async (values) => {
    await addNewProduct(values)
    queryClient.invalidateQueries(['GET_ALL_PRODUCTS'])
    closeAddNewProductModalHandler()
  }

  return (
    <Modal isOpen={isAddNewProductModalOpen} closeHandler={closeAddNewProductModalHandler}>
      <Formik
        initialValues={initialValues}
        validationSchema={validatorAddNewProductModal}
        onSubmit={submitHandler}
      >
        <Form className={styleAddProductModal.form}>
          <h2>Создание товара</h2>
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
          <button type="submit">Добавить</button>
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
