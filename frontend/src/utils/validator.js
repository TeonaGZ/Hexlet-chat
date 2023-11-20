import * as yup from 'yup';

const formSchema = yup.object().shape({
  username: yup.string()
    .required('Обязательное поле'),
  password: yup.string()
    .required('Обязательное поле'),
});

export default formSchema;
