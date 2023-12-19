import * as yup from 'yup';

const formSchema = yup.object().shape({
  username: yup.string()
    .required('Обязательное поле'),
  password: yup.string()
    .required('Обязательное поле'),
});

export const modalSchema = (channels) => yup.object().shape({
  name: yup.string()
    .required('Обязательное поле')
    .min(3, 'минимум 3')
    .max(20, 'максимум 20')
    .notOneOf(channels, 'уже есть'),
});

export const messageSchema = yup.object().shape({
  body: yup
    .string()
    .trim()
    .required(),
});

export const signupSchema = yup.object().shape({
  username: yup.string()
    .required('Обязательное поле')
    .min(3, 'минимум 3')
    .max(20, 'максимум 20'),
  password: yup.string()
    .required('Обязательное поле')
    .min(6, 'минимум 6'),
  confirmPassword: yup.string()
    // .label('confirm password')
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default formSchema;
