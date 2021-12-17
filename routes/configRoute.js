const configRoutes = require('express').Router()

// Import userController
const configController = require('../controllers/configController')

// Associating requests/paths with their controller functions
configRoutes.get('/', configController.retrieve)
configRoutes.put('/', configController.update)
configRoutes.delete('/', configController.delete)

// Export routes to be able to import elsewhere
module.exports = configRoutes