import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';  

function NewVisitModal(props) {
  const [licensePlate, setLicensePlate] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitType, setVisitType] = useState('GUEST');

  const handleSave = async () => {
    const beLink = import.meta.env.VITE_BACKEND_LINK;
    const headers = {
        accept: 'application/json',
        authorization: `Bearer ${props.token}`, 
        'Content-Type': 'application/json' 
    };
    try {
      const resp = await fetch(`${beLink}/visits`, { 
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          date: new Date(visitDate),
          licensePlate: licensePlate,
          visitType: visitType
        }) 
      });

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`)
      }

      props.onHide(); 
    } catch (error) {
      console.error('Error saving visit:', error) 
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         New Visit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>license plate number</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={1} 
                required type="text" 
                placeholder="XXXXXX" 
                value={licensePlate} 
                onChange={(e) => setLicensePlate(e.target.value.toUpperCase())} 
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Visit type</Form.Label>
              <Form.Select
                name="visitType"
                value={visitType} 
                onChange={(e) => setVisitType(e.target.value)}
              >
              <option value="GUEST">GUEST</option>
              <option value="WORKER">WORKER</option>
              <option value="OTHER">OTHER</option>
            </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date" 
                value={visitDate} 
                onChange={(e) => setVisitDate(e.target.value)}
              />
            </Form.Group>
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>create</Button>
        <Button variant="outline-danger" onClick={props.onHide}>cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewVisitModal