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
    const [selectedCar, setSelectedCar] = useState(null); 
    const [carToDelete, setCarToDelete] = useState(null);

    const getCars = async () => {
        const beLink = import.meta.env.VITE_BACKEND_LINK;
        const headers = {
            accept: 'application/json',
            authorization: `Bearer ${token}`, 
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

    useEffect(() => {  
        getCars(); 
    }, []); 

    const handleEditCar = (car) => {
        setSelectedCar(car);
      };
    
    const handleCloseEditModal = () => {
        setSelectedCar(null);
        getCars();
    };

    const handleDeleteCar = (car) => {
        setCarToDelete(car);
    };

    const handleCloseDeleteModal = () => {
        setCarToDelete(null);
        getCars();
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
                  onHide={() => {
                    newCarModelsetShow(!newCarModelShow)
                    }}
                  token={token}
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
                    onClick={() => handleEditCar(car)} 
                  >
                    edit
                  </Button>
                  <div className="vr" />
                  <Button variant="outline-danger" onClick={() => handleDeleteCar(car)}>delete</Button>
                </Stack>
                <CarsModal
                  show={selectedCar === car}
                  onHide={handleCloseEditModal}
                  car={car}
                  token={token}
                />
                <DeleteCarModal
                  show={carToDelete === car} 
                  onHide={handleCloseDeleteModal}
                  car={car}
                  token={token}
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