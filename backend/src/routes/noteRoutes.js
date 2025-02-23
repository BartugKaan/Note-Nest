const express = require('express')
const router = express.Router()
const prisma = require('../config/db')
const authenticateUser = require('../middleware/authMiddleware')

//(GET /api/notes)
router.get('/', authenticateUser, async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: { userId: req.user.userId },
    })
    res.json(notes) // get all notes
  } catch (error) {
    console.error('API Error', error)
    res.status(500).json({ error: 'Error in get all notes' })
  }
})

//Post(/api/notes)
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { title, content } = req.body

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' })
    }

    const newNote = await prisma.note.create({
      data: { title, content, userId: req.user.userId },
    })
    res.status(201).json(newNote)
  } catch (error) {
    console.error('🔥 Error creating note:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while creating the note.' })
  }
})

//Delete(/api/notes/:id)
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params

    const note = await prisma.note.findUnique({
      where: { id: Number(id) },
    })
    if (!note) {
      return res.status(404).json({ error: 'Note not found!' })
    }

    if (note.userId !== req.user.userId) {
      return res
        .status(403)
        .json({ error: 'You do not have permission to delete this note.' })
    }
    await prisma.note.delete({ where: { id: Number(id) } })

    res.json({ message: 'Note deleted successfully' })
  } catch (error) {
    console.error('🔥 Error deleting note:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the note.' })
  }
})

//Update a note by Id (Put /api/notes/:id)
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params
    const { title, content } = req.body

    // Fetch the note
    const note = await prisma.note.findUnique({
      where: { id: Number(id) },
    })

    if (!note) {
      return res.status(404).json({ error: 'Note not found!' })
    }

    console.log('Logged-in User ID:', req.user.userId)
    console.log('Note Owner ID:', note.userId)

    // Check if the note belongs to the authenticated user
    if (note.userId !== req.user.userId) {
      return res
        .status(403)
        .json({ error: 'You do not have permission to update this Note' })
    }

    // Update the note
    const updatedNote = await prisma.note.update({
      where: { id: Number(id) },
      data: {
        title: title || note.title,
        content: content || note.content,
      },
    })

    res.json(updatedNote)
  } catch (error) {
    console.error('🔥 Error updating note:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while updating the note.' })
  }
})

module.exports = router
