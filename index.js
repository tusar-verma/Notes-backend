const express = require('express')
const app = express()
const cors = require('cors')

const { PORT } = require('./util/config')
const { connectToDatabase, sequelize } = require('./util/db')

const notesRouter = require('./Controllers/notes')
const requestLogger = require('./middlewares/requestLogger')
const unknownEndpoint = require('./middlewares/unknownEndpoint')

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/notes', notesRouter)

const start = async () => {
  await connectToDatabase()
  await sequelize.sync() 
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()


app.use(unknownEndpoint)
