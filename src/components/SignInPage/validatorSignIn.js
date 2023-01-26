import * as Yup from 'yup'

export const validatorSignIn = () => Yup.object({
  email: Yup.string()
    .email('Неверный адрес электронной почты')
    .required('Обязательное поле'),
  password: Yup.string()
    .max(20, 'Максимальное кол-во символом не должно превышать 20')
    .required('Обязательное поле'),
})
