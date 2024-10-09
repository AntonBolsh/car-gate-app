import React from "react";
import { Routes, Route } from 'react-router-dom';
import OwnerMenuBar from "./ownerMenuBar";
import CarsMain from "./carsMain"
import VisitsMain from "./visitsMain"


const OwnerApp = ({token}) => {
  return (
    <div>
        <header>
            <OwnerMenuBar />
        </header>
        <main>
            <Routes>
                <Route path="/" element={<CarsMain token={token}/>} />
                <Route path="/cars" element={<CarsMain token={token}/>} />
                <Route path="/visits" element={<VisitsMain token={token}/>} />
            </Routes>
        </main>
    </div>
  )
};

export default OwnerApp;