import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';

function DeleteVisitModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Are you sure you want to delet visit of {props.visit.visitType} <br></br>License Plate {props.visit.licensePlate} on {moment(props.visit.date).format('YYYY-MM-DD')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="danger" >delete</Button>
        <Button variant="secondary" onClick={props.onHide}>cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteVisitModal