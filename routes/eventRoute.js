const eventRoutes = require('express').Router()

// Import userController
const eventController = require('../controllers/eventController')

// Associating requests/paths with their controller functions
eventRoutes.post('/', eventController.create)
eventRoutes.get('/', eventController.retrieve)
eventRoutes.delete ('/:id', eventController.delete)

// Export routes to be able to import elsewhere
module.exports = eventRoutes