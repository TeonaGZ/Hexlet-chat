import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../slices/modalsSlice.js';
import AddModal from './AddModal.jsx';

const modal = {
  add: AddModal,
};

const ModalComponent = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(actions.close());

  const modalType = useSelector((state) => state.modals.modalType);
  const isOpened = useSelector((state) => state.modals.isOpened);
  const CurrentModal = modal[modalType];

  return (
    <Modal show={isOpened} onHide={handleClose} centered>
      { CurrentModal && <CurrentModal handleClose={handleClose} />}
    </Modal>
  );
};

export default ModalComponent;
