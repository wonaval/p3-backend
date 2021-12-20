// Importing express as app
const express = require('express')
const app = express()

// Morgan - Provides request logs
app.use(require('morgan')('tiny'))

// dotenv - Environment import
require('dotenv').config()

// Rowdy
const routesReport = require('rowdy-logger').begin(app)

// Accept JSON formatting
app.use(express.json())

// Allows API fetches from frontend
app.use(require('cors')())

// Import route files
const userRoutes = require('./routes/userRoute')
const configRoutes = require('./routes/configRoute')
const eventRoutes = require('./routes/eventRoute')

// Associating routes with their paths
app.use('/user', userRoutes)
app.use('/config', configRoutes)
app.use('/event', eventRoutes)
app.use(express.static(__dirname + '/public'))

// Starts server with either port in env or 3001 and start route logger
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
  routesReport.print()
})