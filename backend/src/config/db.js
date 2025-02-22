const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

prisma
  .$connect()
  .then(() => console.log('✅ DB connection is OK!'))
  .catch((err) => console.log('❌ DB connection error:', err))

module.exports = prisma
