import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import formSchema from '../../utils/validator.js';
import routes from '../../routes.js';

const LoginForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [authFailed, setAuthFailed] = useState(false);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        auth.logIn();
        localStorage.setItem('userId', JSON.stringify(res.data));
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.focus();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="p-5">
                <Col className="col-12, col-md-6 d-flex align-items-center justify-content-center">
                  <Card.Img src="./images/mountain.jpeg" className="rounded-circle" alt="Войти" />
                </Col>
              </Row>
              <fieldset disabled={formik.isSubmitting}>
                <Form onSubmit={formik.handleSubmit}>
                  <Col className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">Войти</h1>
                  </Col>
                  <Form.Group className="form-floating mb-3">
                    <Form.Label htmlFor="username">Ваш ник</Form.Label>
                    <Form.Control
                      name="username"
                      type="text"
                      autoComplete="username"
                      id="username"
                      placeholder="Ваш ник"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={authFailed}
                      ref={inputRef}
                    />
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      id="password"
                      placeholder="Пароль"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={authFailed}
                    />
                    <Form.Control.Feedback type="invalid">
                      Неверные имя пользователя или пароль
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    type="submit"
                    className="w-100 mb-3 btn btn-outline-primary"
                  >
                    Войти
                  </Button>
                </Form>
              </fieldset>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
