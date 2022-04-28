import { Modal, Button } from 'react-bootstrap';

export default function ModalError({ handleShow, show }) {
  return (
    <Modal show={show} onHide={handleShow}>
      <Modal.Header closeButton>
        <Modal.Title>Error de Conexión</Modal.Title>
      </Modal.Header>
      <Modal.Body>Hubo un error en la conexión con la sala.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleShow}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
