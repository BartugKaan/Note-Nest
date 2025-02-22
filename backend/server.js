require('dotenv').config()
const noteRoutes = require('./src/routes/noteRoutes')
const authRoutes = require('./src/routes/authRoutes')

const express = require('express')
const cors = require('cors')

const app = express()

//Start middleware
app.use(cors())
app.use(express.json()) //For sending Json data's
app.use('/api/notes', noteRoutes) // routes all note requests to noteRoutes
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5005
app.listen(PORT, () => {
  console.log(`Notes-App works on :${PORT} port...`)
})
