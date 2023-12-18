import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import useChatApi from '../../utils/useChatApi.jsx';
import { selectors as modalsSelectors } from '../../slices/modalsSlice.js';

const RemoveModal = ({ handleClose }) => {
  const chatApi = useChatApi();

  const targetId = useSelector(modalsSelectors.getTargetId);

  const handleRemoveChannel = async () => {
    try {
      await chatApi.removeChannel(targetId);
      handleClose();
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        console.log('err', err);
        return;
      }
      throw err;
    }
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>Удалить канал</Modal.Title>
        <Button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button
            type="submit"
            variant="danger"
            onClick={handleRemoveChannel}
          >
            Удалить
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </>
  );
};

export default RemoveModal;
