import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { modalSchema } from '../../utils/validator.js';
import useChatApi from '../../utils/useChatApi.jsx';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { selectors as modalsSelectors } from '../../slices/modalsSlice.js';

const RenameModal = ({ handleClose }) => {
  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels.map((channel) => channel.name);
  const targetId = useSelector(modalsSelectors.getTargetId);

  const chatApi = useChatApi();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: modalSchema(channelsNames),
    onSubmit: async (values) => {
      try {
        await chatApi.renameChannel(targetId, values.name);
        handleClose();
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

  return (
    <>
      <Modal.Header>
        <Modal.Title>Переименовать канал</Modal.Title>
        <Button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              type="text"
              ref={inputRef}
              id="name"
              name="name"
              className="mb-2"
              isInvalid={formik.errors.name}
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <Form.Label visuallyHidden htmlFor="name">
              Имя канала
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <Modal.Footer>
              <Button variant="secondary" className="me-2" onClick={handleClose}>
                Отменить
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={formik.isSubmitting}
              >
                Отправить
              </Button>
            </Modal.Footer>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RenameModal;
