const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../config/db')
const authenticateToken = require('../middleware/authenticateToken')

const router = express.Router()

//User info
router.get('/me', authenticateToken, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    select: { name: true },
  })

  res.json(user)
})

//User Registration (POST /api/auth/register)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      res.status(400).json({ error: 'Name, email and password are required' })
    }

    const existedUser = await prisma.user.findUnique({ where: { email } })
    if (existedUser) {
      return res
        .status(400)
        .json({ error: 'User with this email already exists.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    })
    res.status(201).json({ message: 'User registered successfully!' })
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({ error: 'An error occurred during registration.' })
  }
})

//User Login (Post /api/auth/login)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials.' })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    res.json({ message: 'Login Successfully', token })
  } catch (error) {
    console.error('🔥 Error during login:', error)
    res.status(500).json({ error: 'An error occurred during login.' })
  }
})

module.exports = router
