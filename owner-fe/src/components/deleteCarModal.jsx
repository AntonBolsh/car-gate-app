import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteCarModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Are you sure you want to delet car <br></br>{props.car.licensePlate}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="danger" >delete</Button>
        <Button variant="secondary" onClick={props.onHide}>cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteCarModal