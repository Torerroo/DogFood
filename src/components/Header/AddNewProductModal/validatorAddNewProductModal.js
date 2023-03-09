import * as Yup from 'yup'

export const validatorAddNewProductModal = () => Yup.object({
  pictures: Yup.string(),
  name: Yup.string()
    .required('Обязательное поле'),
  price: Yup.number()
    .required('Обязательное поле'),
  description: Yup.string()
    .required('Обязательное поле'),
  wight: Yup.string(),
  discount: Yup.string(),
  stock: Yup.string(),
  available: Yup.boolean(),
})
