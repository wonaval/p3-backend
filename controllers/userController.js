// Import models folder as 'models'
const models = require('../models')

// Functions below decalation will be added to empty userController object
const userController = {}

// userController (/user Path) Functions
// REQ - Request being passed into function
// RES - Response received after request is processed

// Function description - ROUTE - Path - Route tested?
// Create user - POST - /user - Tested OK
userController.create = async (req, res) => {
  try {
    // Create user with first name, last name, email, password, and if they allowed geolocation
    const createUser = await models.user.create({
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location
    })
    // Geolocation enabled - Save longitude and latitude to config table
    if (createUser.location) {
      const createConfig = await models.config.create({
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        userId: createUser.id})}
    // Georlocation disabled - Save long and lat as null to config table
    else {
      const createConfig = await models.config.create({
        longitude: null,
        latitude: null,
        userId: createUser.id})}
    // Remove password from response json
    const user = await models.user.findOne({where: {id: createUser.id}, attributes: {exclude: 'password'}})
    // Export userInfo to be set into user useContext
    res.json({message: 'Signup succeeded', user: user})
  } catch (error) {
    console.log('Error:', error.message)
    res.status(400).json(error)
  }
}

// Login user - POST - /user/login - Tested OK
userController.login = async (req, res) => {
  try {
    // Retrieve user
    const login = await models.user.findOne({where: {email: req.body.email}})
    if(login && login.password === req.body.password){
      // Remove password from response json
      const user = await models.user.findOne({where: {id: login.id}, attributes: {exclude: 'password'}})
      res.json({message: 'Login succeeded', user: user})}
    else {res.status(401).json({message: 'Login failed'})}
  } catch (error) {
    console.log('Error:', error.message)
    res.status(400).json(error)
  }
}

// Verify user - GET - /user - Tested OK
userController.verify = async (req, res) => {
  try {
    // Retrieve user
    const user = await models.user.findOne({where: {id: req.headers.authorization}})
    if (user) {res.json({message: 'Verification succeeded', user: user})}
    else {res.status(404).json({message: 'Verification failed'})}
  } catch (error) {
    console.log('Error:', error.message)
    res.status(400).json(error)
  }
}

// Update user information - PUT - /user/:id - Tested OK
userController.update = async (req, res) => {
  try {
    // Retrieve user
    const user = await models.user.findOne({where: {id: req.params.id}})
    // Updating account info will require entering their current password
    if (user && user.password === req.body.oldPassword) {
      await user.update({
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        password: req.body.newPassword,
        allowLocation: req.body.location
      })
      res.json({message: 'Update succeeded'})}
    else {res.status(400).json({message: 'Update failed'})}
  } catch (error) {
    console.log('Error:', error.message)
    res.status(400).json(error)
  }
}

// Delete user - DELETE - /user - Tested OK
userController.delete = async (req, res) => {
  try {
    // Retrieve user
    const user = await models.user.findOne({where: {id: req.headers.authorization}})
    // Deleting account will require entering their current password
    if (user && user.password === req.body.password) {
      console.log('Checked')
      // Delete events
      await models.event.destroy({where: {userId: user.id}})
      // Delete settings
      await models.config.destroy({where: {userId: user.id}})
      // Delete user
      await user.destroy()
      res.json({message: 'Deletion succeeded'})}
      else {res.status(400).json({message: 'Deletion failed'})}
  } catch (error) {
    console.log('Error:', error.message)
    res.status(400).json(error)
  }
}

// Export controller to be able to import elsewhere
module.exports = userController