import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../../lib/prisma'

export async function createStudent(request: FastifyRequest, reply: FastifyReply) {
    const createStudentBodySchema = z.object({
        name: z.string(),
        registration: z.string(),
        classroomId: z.coerce.number()
    })

    try {
        const { name, registration, classroomId } = createStudentBodySchema.parse(request.body)

        const studentAlreadyExists = await prisma.student.findUnique({
            where: {
                registration
            }
        })

        if (studentAlreadyExists) return reply.status(409).send({ message: 'Aluno já cadastrado' })

        const student = await prisma.student.create({
            data: {
                name,
                registration,
                classroom_id: classroomId
            }
        })

        return reply.status(201).send({ student_registration: student.registration })
    } catch (err: any) {
        console.log(err)
        return reply.status(400).send({ message: 'Ocorreu um erro ao tentar cadastrar o aluno', error: err.message  })
    }
}