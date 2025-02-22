const express = require('express')
const router = express.Router()
const prisma = require('../config/db')

//(GET /api/notes)
router.get('/', async (req, res) => {
  try {
    const notes = await prisma.note.findMany() // get all notes
    res.json(notes)
  } catch (error) {
    console.error('API Error', error)
    res.status(500).json({ error: 'Error in get all notes' })
  }
})

module.exports = router
