import React from "react";
import OwnerMenuBar from "./ownerMenuBar";
import CarsMain from "./carsMain"


const OwnerApp = () => {
  return (
    <div>
        <header>
            <OwnerMenuBar />
        </header>
        <main>
            <CarsMain />
        </main>
    </div>
  )
};

export default OwnerApp;