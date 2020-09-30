let cars = [
	{ id: "1", year: "1995", model: "Cobra" },
	{ id: "2", year: "2010", model: "Shelby GT Super Snake " },
    { id: "3", year: "2004", model: "SVT Terminator Cobra" },
    { id: "4", year: "1964", model: "Base"},
    { id: "5", year: "2001", model: "Mach 1"}
]

function getCars() {
	return cars
}

function getCarById(id) {
	return cars.find(u => u.id === id)
}

function createCar(data) {
	const payload = {
		id: String(cars.length + 1),
		...data,
	}

	cars.push(payload)
	return payload
}

function updateCar(id, data) {
	const index = cars.findIndex(u => u.id === id)
	cars[index] = {
		...cars[index],
		...data,
	}
	
	return cars[index]
}

function deleteCar(id) {
	cars = cars.filter(u => u.id != id)
}

module.exports = {
	getCars,
	getCarById,
	createCar,
	updateCar,
	deleteCar,
}