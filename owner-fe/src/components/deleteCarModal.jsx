import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteCarModal(props) {

  const handleDelete = async () => {
    
    const beLink = import.meta.env.VITE_BACKEND_LINK;
    const headers = {
        accept: 'application/json',
        authorization: `Bearer ${props.token}`
    };
    try {
      const resp = await fetch(`${beLink}/cars/${props.car._id}`, { 
        method: 'DELETE',
        headers: headers
      });

      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`)
      }

      props.onHide(); 
    } catch (error) {
      console.error('Error saving license plate:', error) 
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
         Are you sure you want to delet car <br></br>{props.car.licensePlate}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={handleDelete} variant="danger" >delete</Button>
        <Button variant="secondary" onClick={props.onHide}>cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteCarModal