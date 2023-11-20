import React from 'react';
import { Formik, Form, Field } from 'formik';
import formSchema from '../utils/validator.js';

const LoginForm = () => (
  <div>
    <h1>Войти</h1>
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={formSchema}
      // onSubmit={ (values) => {
      //   console.log(values);
      // }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="username" placeholder="Ваш ник" />
          {errors.username && touched.username ? (
            <div>{errors.username}</div>
          ) : null}
          <Field name="password" placeholder="Пароль" />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <button type="submit">Войти</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default LoginForm;
