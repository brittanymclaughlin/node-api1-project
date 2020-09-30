const express = require("express");
const db = require("./database");
const cors = require('cors');

const server = express()

server.use(express.json())
server.use(cors())

server.get("/", (req, res) => {
	res.json({ message: "Hello, Mustang Lovers!" })
})

//Post request operation
server.post("/api/cars", (req, res) => {
    const newCar = db.createCar({
        year: req.body.year,
        model:req.body.model
    })
    try{
        if (req.body.year && req.body.model){
            res.status(201).json(newCar)
        } else {
            res.status(404).json({ errorMessage: "404: Please provide year and model for the car."})
        }
    } catch(error) {
        return res.status(500).json({errorMessage: "500: Server error!"})
    }

})

//GET request operations
server.get("/api/cars", (req, res) => {
	const cars = db.getCars()
    if(cars){
    res.status(200).json(cars)
    } else {
        res.status(500).json({ errorMessage: "This car's information could not be retrieved." })
    }
})

//GET request for certain car ID operations
server.get("/api/cars/:id", (req, res) => {
	const id = req.params.id
	const car = db.getCarById(id)

	try{
        if (car) {
		    res.json(car)
	    } else {
	    	res.status(404).json({
			    message: "404: The care with the specified ID does not exist.",
		    })
        }
    }catch(error){ return res.status(500).json({ 
        errorMessage: "500: The car information could not be retrieved."
    })}
})

//DELETE operations
server.delete("/api/cars/:id", (req, res) => {
	const id = req.params.id
	const car = db.getCarById(id)
    try{
        if (car) {
            db.deleteCar(id)
            // 204 means a successful empty response
            res.status(204).end()
        } else {
            res.status(404).json({
                message: "404: The car with the specified ID does not exist.",
            })
        }
    } catch(error){
        return res.status(500).json({
            errorMessage: "500: The car could not be removed."
        })
    }
})

//PUT operations
server.put("/api/cars/:id", (req, res) => {
	const id = req.params.id
	const car = db.getCarById(id)

    try{
        if (car) {
            const updatedCar = db.updateCar(car.id, {
                year: req.body.year || car.year,
                model: req.body.model || car.model
            })

            res.status(200).json(updatedCar)
        } else {
            res.status(404).json({
                message: "404: The car with the specificed ID does not exist."
            })
        }
    } catch(error) {
        res.status(500).json({ errorMessage: "The car information could not be modified." }) || res.status(400).json({errorMessage: "400: Please provide year and model for the car."})
    }
})
// web servers need to be continuously listening
server.listen(5000, () => {
	console.log("Mustang Server has started! Vroom vroom!!")
})