/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { dogFoodApi } from '../../../Api/DogFoodApi'
import { Modal } from '../../Modal/Modal'
import { getUserInfoSelector } from '../../../redux/slices/userInfoSlice'
import styleModal from './AddNewReviewModal.module.css'

export function AddNewReviewModal({ setIsAddNewReviewModalOpen, isAddNewReviewModalOpen }) {
  const queryClient = useQueryClient()
  const { productID } = useParams()
  const { token } = useSelector(getUserInfoSelector)

  const closeAddNewReviewModalHandler = () => {
    setIsAddNewReviewModalOpen(false)
  }

  const initialValues = {
    rating: '',
    text: '',
  }

  const validatorAddReview = () => Yup.object({
    rating: Yup.string()
      .required('Обязательное поле'),
    text: Yup.string()
      .required('Обязательное поле'),
  })

  const {
    mutateAsync: addNewReview, isLoading,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.addProductReviewById(productID, token, values),
  })

  const submitHandler = async (values) => {
    await addNewReview(values)
    queryClient.invalidateQueries(['reviews'])
    closeAddNewReviewModalHandler()
  }

  return (
    <Modal isOpen={isAddNewReviewModalOpen} closeHandler={closeAddNewReviewModalHandler}>
      <Formik
        initialValues={initialValues}
        validationSchema={validatorAddReview}
        onSubmit={submitHandler}
      >
        <Form className={styleModal.form}>
          <h2 className={styleModal.title}>Добавить отзыв</h2>
          <div className={styleModal.rating}>
            <label>Ваша оценка товару</label>
            <Field name="rating" type="number" placeholder="от 1 до 5" min="1" max="5" />
            <ErrorMessage component="p" name="rating" />
          </div>
          <div className={styleModal.text}>
            <label>Комментарий</label>
            <Field as="textarea" name="text" type="text" />
            <ErrorMessage component="p" name="text" />
          </div>
          <button disabled={isLoading} type="submit">Добавить</button>
        </Form>
      </Formik>
    </Modal>
  )
}
