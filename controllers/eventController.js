// Import models folder as 'models'
const models = require('../models')

// Functions below decalation will be added to empty eventController object
const eventController = {}

// eventController (/event Path) Functions

// REQ - Request being passed into function
// RES - Response received after request is processed

// Function description - ROUTE - Path - Route tested?
// Create event - POST - /event - Tested OK
eventController.create = async (req, res) => {
  try {
    const user = await models.user.findOne({where: {id: req.headers.authorization}})
    const createEvent = await models.event.create({
      title: req.body.title,
      location: req.body.location,
      date: req.body.date,
      description: req.body.description,
      userId: user.id})
    res.json({message: 'Event creation succeeded', event: createEvent})
  } catch (error) {
    console.log('Error:', error.message)
    res.status(400).json(error)
  }
}

// Get event list - GET - /event - Tested OK
eventController.retrieve = async (req, res) => {
  try {
    const user = await models.user.findOne({where: {id: req.headers.authorization}})
    const eventList = await models.event.findAll({where: {userId: user.id}})
    console.log(eventList)
    res.json({message: 'Event List retrieval succeeded', event: eventList})
  } catch (error) {
    console.log('Error:', error.message)
    res.status(400).json(error)
  }
}

// Delete event - DELETE - /event/:id- Tested OK
eventController.delete = async (req, res) => {
  try {
    const user = await models.user.findOne({where: {id: req.headers.authorization}})
    if (user) {
      await models.event.destroy({where: {id: req.params.id}})
      res.json({message: 'Event deletion succeeded'})}
    else {
      res.json({message: 'Event deletion succeeded'})}
  } catch (error) {
    console.log('Error:', error.message)
    res.status(400).json(error)
  }
}

// Export controller to be able to import elsewhere
module.exports = eventController