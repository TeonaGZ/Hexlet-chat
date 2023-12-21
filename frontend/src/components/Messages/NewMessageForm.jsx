import React, { useRef, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import useChatApi from '../../utils/useChatApi';
import { messageSchema } from '../../utils/validator.js';

const NewMessageForm = ({ currentChannelId }) => {
  const inputRef = useRef(null);
  const chatApi = useChatApi();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: messageSchema(t('validationRules.required')),
    onSubmit: async ({ body }) => {
      const { username } = JSON.parse(localStorage.getItem('userId'));

      try {
        await chatApi.addMessage(body, currentChannelId, username);
        formik.resetForm();
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          inputRef.current.focus();
          return;
        }
        throw err;
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId, formik.values]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup>
          <Form.Control
            ref={inputRef}
            onChange={formik.handleChange}
            value={formik.values.body}
            name="body"
            className="border-0 p-0 ps-2"
            aria-label={t('messages.newMessage')}
            placeholder={t('messages.inputMessage')}
            disabled={formik.isSubmitting}
          />
          <Button variant="group-vertical" type="submit" className="border-0" disabled={formik.isSubmitting}>
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">{t('messages.sendMessage')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default NewMessageForm;
