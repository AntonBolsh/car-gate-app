import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import  "./main.css"
import { useState, useEffect } from 'react'; 
import CarsModal from './carsModal'
import NewCarModal from './newCarModal'
import DeleteCarModal from './deleteCarModal'
import moment from 'moment';

function visitsMain() {
    const [visits, setVisits] = useState([]); 
    //const [newCarModelShow, newCarModelsetShow] = useState(false);

    useEffect(() => { 
        const getVisits = async () => {
            const beLink = import.meta.env.VITE_BACKEND_LINK;
            const headers = {
                accept: 'application/json',
                authorization: `Bearer xxx99392994k`, // need to change hear when finish
            };
            
            try { 
                const visitsRes = await fetch(`${beLink}/visits`, {
                    method: 'GET',
                    headers: headers
                });
                if (visitsRes.status === 200) {
                    const visitsResp = await visitsRes.json();
                    setVisits(visitsResp); 
                } else {
                    console.error("Error fetching visits:", visitsRes.status); 
                    setVisits([]);
                }
            } catch (error) {
                console.error("Error fetching visits:", error);
                setVisits([]);
            }
        };
        getVisits(); 
    }, []); 

    // const toggleModal = (index) => {
    //     setCars((prevCars) =>
    //       prevCars.map((car, i) =>
    //         i === index ? { ...car, showModal: !car.showModal } : car,
    //       ),
    //     );
    //   };
    
    // const toggleDeleteModal = (index) => {
    //     setCars((prevCars) =>
    //         prevCars.map((car, i) =>
    //         i === index ? { ...car, showDeleteModal: !car.showDeleteModal } : car,
    //         ),
    //     );
    // };
    
      return (
        <Container fluid="sm" className="justify-content-center">
          <Stack className="first-stack" direction="horizontal" gap={3}>
            <div className="p-2">Visits</div>
            <Button className="ms-auto" variant="primary" onClick={() => newCarModelsetShow(true)}>
              Add +
            </Button>
            {/* <NewCarModal
                  show={newCarModelShow}
                  onHide={() => newCarModelsetShow(!newCarModelShow)}
                /> */}
          </Stack>
          {visits.length > 0 ? (
            visits.map((visit, index) => (
              <div key={index}> 
                <Stack className="custom-stack" direction="horizontal" gap={3}>
                  <div className="p-2">{visit.licensePlate}</div>
                  <div className="p-2">{visit.visitType}</div>
                  <div className="p-2">{moment(visit.date).format('MMMM Do YYYY')}</div>
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
                {/* <CarsModal
                  show={car.showModal || false}
                  onHide={() => toggleModal(index)}
                  car={car}
                /> */}
                {/* <DeleteCarModal
                  show={car.showDeleteModal || false}
                  onHide={() => toggleDeleteModal(index)}
                  car={car}
                /> */}
              </div>
            ))
          ) : (
            <div></div>
          )}
        </Container>
      );
    }
    
    export default visitsMain;