import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import moment from 'moment';

function VisitsModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Edit Visit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>license plate number</Form.Label>
              <Form.Control as="textarea" rows={1} required type="text" defaultValue={props.visit.licensePlate} placeholder="XXXXXX"/>
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Visit type</Form.Label>
              <Form.Select defaultValue={props.visit.visitType}>
              <option value="GUEST">GUEST</option>
              <option value="WORKER">WORKER</option>
              <option value="OTHER">OTHER</option>
            </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                defaultValue={moment(props.visit.date).format('YYYY-MM-DD')}
              />
            </Form.Group>
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>save</Button>
        <Button variant="outline-danger" onClick={props.onHide}>cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VisitsModal