import React from "react";
import { Routes, Route } from 'react-router-dom';
import OwnerMenuBar from "./ownerMenuBar";
import CarsMain from "./carsMain"
import VisitsMain from "./visitsMain"


const OwnerApp = () => {
  return (
    <div>
        <header>
            <OwnerMenuBar />
        </header>
        <main>
            <Routes>
                <Route path="/" element={<CarsMain />} />
                <Route path="/cars" element={<CarsMain />} />
                <Route path="/visits" element={<VisitsMain />} />
            </Routes>
        </main>
    </div>
  )
};

export default OwnerApp;