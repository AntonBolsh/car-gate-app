const express = require('express');
const User = require('../models/user.js');
const Car = require('../models/car.js');
const Property = require('../models/property.js');
const Visit = require('../models/visit.js');
const keycloak = require("../middlewares/keycloak");
require('dotenv').config();
 
var router = express.Router();

//Create a property
router.post('/property', (req,res) => {
  
    const property = new Property({
        address: req.body.address
    });
    
    property.save()
    .then(data => {
        res.status(201).send(data);
        console.log(`new property was created with address${data.address}`)
    }).catch(err => {
        res.status(500).send({message:`Error creating property ${err.message}`});
    });
});

//Delete a property
router.delete('/property/:id', (req,res) => {
    Property.findOneAndDelete({_id : req.params.id})
    .then(property => {
        if(!property) {
            return res.status(404).send({
                message: "Property not found "
            });
        }
        res.status(204).send({message: "Property deleted successfully!"});
    }).catch(err => {         
        return res.status(500).send({
            message: `Could not delete user with id ${err.message} req.params.id`
        });
    });
});

//Find a property
router.get('/property/:id', (req,res) => {
    Property.find({_id : req.params.id})
    .then(property => {
        if(!property || property.length == 0) {
            return res.status(404).send({
                message: `Property not found with id ${req.params.id}`
            });            
        }
        res.status(200).send(property);
    }).catch(err => {         
        return res.status(500).send({
            message: `Error retrieving user : ${err.message}`
        });
    });
    
});

//Create a car
router.post('/car', (req,res) => {
  
    const property = new Car({
        licensePlate: req.body.licensePlate,
        property_id: req.body.property_id
    });
    
    property.save()
    .then(data => {
        res.status(201).send(data);
        console.log(`new Car was created ${data.licensePlate}`)
    }).catch(err => {
        res.status(500).send({message:`Error creating car ${err.message}`});
    });
});

//Delete a car
router.delete('/car/:id', (req,res) => {
    Car.findOneAndDelete({_id : req.params.id})
    .then(property => {
        if(!property) {
            return res.status(404).send({
                message: "Car not found "
            });
        }
        res.status(204).send({message: "Car deleted successfully!"});
    }).catch(err => {         
        return res.status(500).send({
            message: `Could not delete car with id ${req.params.id} ${err.message}`
        });
    });
});

//Find a car by plate number
router.get('/car/:licensePlate', keycloak.protect('realm:security-gate-keeper'), (req,res) => {
    //req.kauth.grant contains user information
    //console.log(req.kauth.grant)

    Car.find({licensePlate : req.params.licensePlate})
    .then(cars => {
        if(!cars || cars.length == 0) {
            return res.status(404).send({
                message: `Car not found with id ${req.params.licensePlate}`
            });            
        }
        const car = cars[0];
        return Property.find({_id : car.property_id})
            .then(property => {
                if(!property || property.length !== 1) {
                    return res.status(400).send({
                        message: `Car doesn't have property or have to many properties`
                    });            
                }
                const carWithAddress = { ...car, property_address: property[0].address };
                res.status(200).send(carWithAddress);
            }).catch(err => {    
                console.log(err)     
                return res.status(500).send({
                    message: `Error retrieving user : ${err.message}`
                });
            });
    }).catch(err => {         
        return res.status(500).send({
            message: `Error retrieving car : ${err.message}`
        });
    });
    
});

//Create a Visit
router.post('/visit', (req,res) => {
  
    const property = new Visit({
        licensePlate: req.body.licensePlate,
        property_id: req.body.property_id,
        date: req.body.date,
        visitType: req.body.visitType
    });
    
    property.save()
    .then(data => {
        res.status(201).send(data);
        console.log(`new Visit was created ${data.licensePlate}`)
    }).catch(err => {
        res.status(500).send({message:`Error creating visit ${err.message}`});
    });
});

//Delete a Visit
router.delete('/visit/:id', (req,res) => {
    Visit.findOneAndDelete({_id : req.params.id})
    .then(property => {
        if(!property) {
            return res.status(404).send({
                message: "Visit not found "
            });
        }
        res.status(204).send({message: "Visit deleted successfully!"});
    }).catch(err => {         
        return res.status(500).send({
            message: `Could not delete Visit with id ${req.params.id} ${err.message}`
        });
    });
});

//Find a Visit by plate number
router.get('/visit/:licensePlate', (req,res) => {
    Visit.find({licensePlate : req.params.licensePlate})
    .then(visit => {
        if(!visit || visit.length == 0) {
            return res.status(404).send({
                message: `Vivist not found with id ${req.params.licensePlate}`
            });            
        }
        res.status(200).send(car);
    }).catch(err => {         
        return res.status(500).send({
            message: `Error retrieving visit : ${err.message}`
        });
    });
    
});

module.exports = router;