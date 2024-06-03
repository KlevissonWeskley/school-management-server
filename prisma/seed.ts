import { prisma } from '../src/lib/prisma'
import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

async function seed() {
  const classroom_id = 5

  const studentsToInsert: Prisma.StudentUncheckedCreateInput[] = []

  for (let i = 0; i <= 20; i++) {
    studentsToInsert.push({
      id: randomUUID(),
      name: faker.person.fullName(),
      registration: faker.string.numeric(10),
      classroom_id,
      created_at: new Date()
    })
  }

  await Promise.all(studentsToInsert.map(data => {
    return prisma.student.create({
      data,
    })
  }))
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})