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

//Post(/api/notes)
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and Content required!' })
    }

    const newNote = await prisma.note.create({
      data: { title, content },
    })
    res.status(201).json(newNote)
  } catch (error) {
    console.error('Error occured while created new Note!', error)
    res.status(500).json({ error: 'Error happend' })
  }
})

module.exports = router
