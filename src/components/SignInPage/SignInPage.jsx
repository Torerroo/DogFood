import { useMutation } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import './SignInPage.css'
import { Link, useNavigate } from 'react-router-dom'
import { validatorSignIn } from './validatorSignIn'
import { useTokenContext } from '../../Contexts/TokenContextProvider'

const initialValues = {
  email: '',
  password: '',
}

export function SignInPage() {
  const { setToken } = useTokenContext()

  const navigate = useNavigate()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status >= 400 && res.status < 500) {
        throw new Error(`Произошла ошибка при входе в Личный кабинет. 
        Проверьте отправляемые данные. Status: ${res.status}`)
      }

      if (res.status >= 500) {
        throw new Error(`Произошла ошибка при получении ответа от сервера. 
        Попробуйте сделать запрос позже. Status: ${res.status}`)
      }
      return res.json()
    }),
  })

  const submitHandler = async (values) => {
    const response = await mutateAsync(values)
    setToken(response.token)
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
        <div className="fs-4">
          Если у вас еще нету аккаунта, то вам
          {' '}
          <Link to="/signup">Сюда</Link>
        </div>
      </Form>
    </Formik>
  )
}
