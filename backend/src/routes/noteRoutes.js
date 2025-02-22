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

//Delete(/api/notes/:id)
router.delete('/:id', async (req, res) => {
  try {
    // get id from param
    const { id } = req.params

    //Check if id is valid
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'This id is not valid.' })
    }

    //Check if note is exist db
    const existingNote = await prisma.note.findUnique({
      where: { id: Number(id) },
    })

    if (!existingNote) {
      return res.status(404).json({ error: 'Note cannot find' })
    }

    await prisma.note.delete({
      where: { id: Number(id) },
    })
    res.json({
      message: `This note with ${id} this ID has been successfully deleted.`,
    })
  } catch (error) {
    console.error('Error happend while deleting note', error)
    res.status(500).json({ error: 'Something gone wrong!' })
  }
})

module.exports = router
