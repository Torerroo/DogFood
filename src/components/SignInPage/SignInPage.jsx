import { useMutation } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import './SignInPage.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { validatorSignIn } from './validatorSignIn'
import { dogFoodApi } from '../../Api/DogFoodApi'
import { setToken } from '../../redux/slices/getTokenSlice'

const initialValues = {
  email: '',
  password: '',
}

export function SignInPage() {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: (values) => dogFoodApi.signIn(values)
      .then((res) => {
        dispatch(setToken(res.token))
        dogFoodApi.setToken(res.token)
      }),
  })

  const submitHandler = async (values) => {
    await mutateAsync(values)
    setTimeout(() => navigate('/products'))
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validatorSignIn}
      onSubmit={submitHandler}
    >
      <Form className="SignUpPage__container">
        <div>
          <Field name="email" type="email" placeholder="email here" />
          <ErrorMessage component="p" name="email" />
        </div>
        <div>
          <Field name="password" type="password" placeholder="password here" />
          <ErrorMessage component="p" name="password" />
        </div>
        <button disabled={isLoading} type="submit">Авторизация</button>
        {isError && (
        <p className="SignInPage-error">
          {error.message}
        </p>
        )}
        <div className="fs-4">
          Если у вас еще нету аккаунта, то вам
          {' '}
          <Link to="/signup">Сюда</Link>
        </div>
      </Form>
    </Formik>
  )
}
