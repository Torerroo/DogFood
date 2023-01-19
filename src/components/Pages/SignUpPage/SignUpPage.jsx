import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import * as Yup from 'yup'
import './SignUpPage.css'

const initialValues = {
  email: '',
  group: '',
  password: '',
}

export function SignUpPage() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        group: Yup.string()
          .required('Required'),
        password: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
      })}
      onSubmit={(values) => {
        console.log(values)
      }}
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
          <Field name="password" type="text" placeholder="password here" />
          <ErrorMessage component="p" name="password" />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </Form>
    </Formik>
  )
}
