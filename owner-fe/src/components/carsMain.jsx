import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import  "./main.css"
import { useState, useEffect } from 'react'; 
import CarsModal from './carsModal'
import NewCarModal from './newCarModal'
import DeleteCarModal from './deleteCarModal'

function carsMain({token}) {
    const [cars, setCars] = useState([]); 
    const [newCarModelShow, newCarModelsetShow] = useState(false);

    useEffect(() => { 
        const getCars = async () => {
            const beLink = import.meta.env.VITE_BACKEND_LINK;
            const headers = {
                accept: 'application/json',
                authorization: `Bearer ${token}`, // need to change hear when finish
            };
            
            try { 
                const carRes = await fetch(`${beLink}/cars`, {
                    method: 'GET',
                    headers: headers
                });
                if (carRes.status === 200) {
                    const carResp = await carRes.json();
                    setCars(carResp); 
                } else {
                    console.error("Error fetching cars:", carRes.status); 
                    setCars([]);
                }
            } catch (error) {
                console.error("Error fetching cars:", error);
                setCars([]);
            }
        };
        getCars(); 
    }, []); 

    const toggleModal = (index) => {
        setCars((prevCars) =>
          prevCars.map((car, i) =>
            i === index ? { ...car, showModal: !car.showModal } : car,
          ),
        );
      };
    
    const toggleDeleteModal = (index) => {
        setCars((prevCars) =>
            prevCars.map((car, i) =>
            i === index ? { ...car, showDeleteModal: !car.showDeleteModal } : car,
            ),
        );
    };
    
      return (
        <Container fluid="sm" className="justify-content-center">
          <Stack className="first-stack" direction="horizontal" gap={3}>
            <div className="p-2">Cars</div>
            <Button className="ms-auto" variant="primary" onClick={() => newCarModelsetShow(true)}>
              Add +
            </Button>
            <NewCarModal
                  show={newCarModelShow}
                  onHide={() => newCarModelsetShow(!newCarModelShow)}
                />
          </Stack>
          {cars.length > 0 ? (
            cars.map((car, index) => (
              <div key={index}> 
                <Stack className="custom-stack" direction="horizontal" gap={3}>
                  <div className="p-2">{car.licensePlate}</div>
                  <Button
                    className="ms-auto"
                    variant="secondary"
                    onClick={() => toggleModal(index)}
                  >
                    edit
                  </Button>
                  <div className="vr" />
                  <Button variant="outline-danger" onClick={() => toggleDeleteModal(index)}>delete</Button>
                </Stack>
                <CarsModal
                  show={car.showModal || false}
                  onHide={() => toggleModal(index)}
                  car={car}
                />
                <DeleteCarModal
                  show={car.showDeleteModal || false}
                  onHide={() => toggleDeleteModal(index)}
                  car={car}
                />
              </div>
            ))
          ) : (
            <div></div>
          )}
        </Container>
      );
    }
    
    export default carsMain;