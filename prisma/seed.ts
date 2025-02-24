import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create test user
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      followers: 5236,
    },
  })

  // Create some test messages
  await prisma.message.create({
    data: {
      text: 'This is a test message',
      status: 'unread',
      score: 0.83,
      userId: user.id,
    },
  })

  await prisma.message.create({
    data: {
      text: 'Another test message',
      status: 'replied',
      score: 0.75,
      userId: user.id,
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
