require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

//Start middleware
app.use(cors())
app.use(express.json()) //For sending Json data's

app.get('/', (req, res) => {
  res.send('Notes App Works!!')
})

const PORT = process.env.PORT || 5005
app.listen(PORT, () => {
  console.log(`Notes-App works on :${PORT} port...`)
})
