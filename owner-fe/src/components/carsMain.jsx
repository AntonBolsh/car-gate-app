import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import  "./main.css"
import { useState, useEffect } from 'react'; 

function carsMain() {
    const [cars, setCars] = useState([]); 

    useEffect(() => { 
        const getCars = async () => {
            const beLink = import.meta.env.VITE_BACKEND_LINK;
            const headers = {
                accept: 'application/json',
                authorization: `Bearer xxx99392994k`,
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

  return (
    <Container fluid="sm" className="justify-content-center">
            <Stack className = "first-stack" direction="horizontal" gap={3}>
            <div className="p-2">Cars</div>
            <Button className="ms-auto" variant="primary">Add +</Button>
            </Stack>
            {cars.length > 0 ? ( 
                cars.map((car, index) => (
                    <Stack key={index} className = "custom-stack" direction="horizontal" gap={3}>
                    <div className="p-2">{car.licensePlate}</div>
                    <Button className="ms-auto" variant="secondary">edit</Button>
                    <div className="vr" />
                    <Button variant="outline-danger">delete</Button>
                    </Stack>
                ))
            ) : (
                <div></div> 
            )}
    </Container>
  );
}

export default carsMain;