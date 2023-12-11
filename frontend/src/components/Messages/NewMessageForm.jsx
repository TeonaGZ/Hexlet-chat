import React, { useRef, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';

const NewMessageForm = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async ({ body }) => {
      if (body === 0) {
        inputRef.current.focus();
      }
    },
  });

  return (
    <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Form.Control
          ref={inputRef}
          onChange={formik.handleChange}
          value={formik.values.body}
          name="body"
          className="form-control border-0 p-0 ps-2"
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          disabled={formik.isSubmitting}
        />
        <Button variant="group-vertical" type="submit" disabled={formik.isSubmitting}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessageForm;
