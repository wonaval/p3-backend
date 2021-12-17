const userRoutes = require('express').Router()

// Import userController
const userController = require('../controllers/userController')

// Associating requests/paths with their controller functions
userRoutes.post('/', userController.create)
userRoutes.post('/login', userController.login)
userRoutes.get('/', userController.verify)
userRoutes.put ('/:id', userController.update)
userRoutes.delete ('/', userController.delete)

// Export routes to be able to import elsewhere
module.exports = userRoutes