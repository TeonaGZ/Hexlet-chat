import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import useAuth from '../../utils/useAuth.jsx';
import { signupSchema } from '../../utils/validator.js';
import routes from '../../routes.js';
import SignUpImage from '../../images/SignUpImage.jpg';

const SignUpForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [signUpFailed, setSignUpFailed] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    onSubmit: async ({ username, password }) => {
      setSignUpFailed(false);

      try {
        const res = await axios.post(routes.signUpPath(), { username, password });
        auth.logIn();
        localStorage.setItem('userId', JSON.stringify(res.data));
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 409) {
          setSignUpFailed(true);
          inputRef.current.focus();
          return;
        }
        throw err;
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const isInvalidUsername = formik.touched.username && formik.errors.username;
  const isInvalidPassword = formik.touched.password && formik.errors.password;
  const isInvalidConfirmPassword = formik.touched.confirmPassword && formik.errors.confirmPassword;

  return (
    <Container fluid className="h-100">
      <Row className="h-100 justify-content-center align-content-center">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={SignUpImage} className="rounded-circle" alt="Регистрация" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      name="username"
                      autoComplete="username"
                      required
                      placeholder="От 3 до 20 символов"
                      id="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={signUpFailed || isInvalidUsername}
                      ref={inputRef}
                    />
                    <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </Form.Floating>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      placeholder="Не менее 6 символов"
                      id="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={signUpFailed || isInvalidPassword}
                    />
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </Form.Floating>
                  <Form.Floating className="mb-4">
                    <Form.Control
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      id="confirmPassword"
                      placeholder="Пароли должны совпадать"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      isInvalid={signUpFailed || isInvalidConfirmPassword}
                    />
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.confirmPassword || 'Такой пользователь уже существует'}
                    </Form.Control.Feedback>
                  </Form.Floating>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100"
                  >
                    Зарегистрироваться
                  </Button>
                </fieldset>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
