import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import  "./main.css"
import { useState, useEffect } from 'react'; 
import VisitsModal from './visitsModal'
import NewVisitModal from './newVisitModal'
import DeleteVisitModal from './deleteVisitModal'
import moment from 'moment';

function visitsMain({token}) {
    const [visits, setVisits] = useState([]); 
    const [newVisitModelShow, newVisitModelsetShow] = useState(false);

    const getVisits = async () => {
      const beLink = import.meta.env.VITE_BACKEND_LINK;
      const headers = {
          accept: 'application/json',
          authorization: `Bearer ${token}`, // need to change hear when finish
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

    useEffect(() => { 
        getVisits(); 
    }, []); 

    const toggleModal = (index) => {
      setVisits((prevVisits) =>
        prevVisits.map((visit, i) =>
            i === index ? { ...visit, showModal: !visit.showModal } : visit,
          ),
        );
      };
    
    const toggleDeleteModal = (index) => {
      setVisits((prevVisits) =>
            prevVisits.map((visit, i) =>
            i === index ? { ...visit, showDeleteModal: !visit.showDeleteModal } : visit,
            ),
        );
    };
    
      return (
        <Container fluid="sm" className="justify-content-center">
          <Stack className="first-stack" direction="horizontal" gap={3}>
            <div className="p-2">Visits</div>
            <Button className="ms-auto" variant="primary" onClick={() => newVisitModelsetShow(true)}>
              Add +
            </Button>
            <NewVisitModal
                  show={newVisitModelShow}
                  onHide={() => {
                    newVisitModelsetShow(!newVisitModelShow)
                    getVisits()
                  }}
                  token={token}
                />
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
                <VisitsModal
                  show={visit.showModal || false}
                  onHide={() => {
                    toggleModal(index)
                    getVisits()
                  }}
                  visit={visit}
                  token={token}
                />
                <DeleteVisitModal
                  show={visit.showDeleteModal || false}
                  onHide={() => {
                    toggleDeleteModal(index)
                    getVisits()
                  }}
                  visit={visit}
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
    
    export default visitsMain;