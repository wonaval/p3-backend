// Import models folder as 'models'
const models = require('../models')

// Functions below decalation will be added to empty configController object
const configController = {}

// configController (/config Path) Functions

// REQ - Request being passed into function
// RES - Response received after request is processed

// Function description - ROUTE - Path - Route tested?
// Get user location settings - GET - /config - Tested OK
configController.retrieve = async (req, res) => {
  try {
    // Retrieve user and location information
    const user = await models.user.findOne({where: {id: req.headers.authorization}})
    const getConfig = await models.config.findOne({where: {userId: user.id}})
    res.json({message: 'Settings retrieval succeeded', config: getConfig})
  } catch (error) {
    console.log('Error:', error.message)
    res.status(400).json(error)
  }
}

// Update user location settings - PUT - /config - Tested OK
configController.update = async (req, res) => {
  try {
    // Retrieve user and update location settings
    // Password is not require as with the other functions since this will be more of a refresh of geolocation
    const user = await models.user.findOne({where: {id: req.headers.authorization}})
    if (user.location) {
      await user.update({location: false})
      const config = await models.config.findOne({where: {userId: user.id}})
      const updateConfig = await config.update({
      longitude: null,
      latitude: null})}
    else {
      await user.update({location: true})
      const config = await models.config.findOne({where: {userId: user.id}})
      const updateConfig = await config.update({
        longitude: req.body.longitude,
        latitude: req.body.latitude})}
    res.json({message: 'Settings update succeeded'})}
  catch (error) {
    console.log('Error:', error.message)
    res.status(400).json(error)
  }
}

// Clear location settings for user - DELETE - /config - Tested OK
configController.delete = async (req, res) => {
  try {
    // Retrieve user and sets location settings to null
    // No password required as we want user to easily opt in and out of geolocation
    const user = await models.user.findOne({where: {id: req.headers.authorization}})
    user.location = false;
    await user.save();
    if (user) {
    const config = await models.config.findOne({where: {userId: user.id}})
    const deleteConfig = await config.update({
      longitude: null,
      latitude: null
    })

    res.json({message: 'Location clear succeeded'})}
    else {res.status(400).json({message: 'Location clear failed'})}
  } catch (error) {
    console.log('Error:', error.message)
    res.status(400).json(error)
  }
}

// Export controller to be able to import elsewhere
module.exports = configController