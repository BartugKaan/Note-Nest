const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../config/db')
const { error } = require('console')

const router = express.Router()

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
    res.status(201).json({ message: 'USer registered successfully!' })
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({ error: 'An error occurred during registration.' })
  }
})

module.exports = router
