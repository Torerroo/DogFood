import { useMutation } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import './SignUpPage.css'
import { validatorSignUp } from './validatorSignUp'

const initialValues = {
  email: '',
  group: 'sm9',
  password: '',
}

export function SignUpPage() {
  const navigate = useNavigate()

  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: (data) => fetch('https://api.react-learning.ru/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 409) {
        throw new Error('Пользователь с таким email уже существует')
      }
      return res.json()
    }),
  })

  const SubmitHandler = async (values) => {
    await mutateAsync(values)
    navigate('/signin')
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validatorSignUp}
        onSubmit={SubmitHandler}
      >
        <Form className="SignUpPage__container">
          <div>
            <Field name="email" type="email" placeholder="email here" />
            <ErrorMessage component="p" name="email" />
          </div>
          <div>
            <Field name="group" type="text" placeholder="sm9" />
            <ErrorMessage component="p" name="group" />
          </div>
          <div>
            <Field name="password" type="password" placeholder="password here" />
            <ErrorMessage component="p" name="password" />
          </div>
          <button disabled={isLoading} type="submit">Зарегистрироваться</button>
        </Form>
      </Formik>
      {isError && (
        <p className="SignUpPage-error">
          {error.message}
        </p>
      )}
    </>
  )
}
