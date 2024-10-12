import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';  

function CarsModal(props) {

  const [licensePlate, setLicensePlate] = useState(props.car.licensePlate);

  const handleUpdate = async () => {
    
    const beLink = import.meta.env.VITE_BACKEND_LINK;
    const headers = {
        accept: 'application/json',
        authorization: `Bearer ${props.token}`, 
        'Content-Type': 'application/json' 
    };
    try {
      const resp = await fetch(`${beLink}/cars/${props.car._id}`, { 
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({   
        licensePlate: licensePlate }) 
      });

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`)
      }

      props.onHide(); // add refreshing car list
    } catch (error) {
      console.error('Error saving license plate:', error) //add handling of error
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
         Edit car
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
              rows={1} required 
              type="text" 
              defaultValue={licensePlate} 
              placeholder="XXXXXX" 
              value={licensePlate} 
              onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
              />
            </Form.Group>
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpdate}>save</Button>
        <Button variant="outline-danger" onClick={props.onHide}>cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CarsModal