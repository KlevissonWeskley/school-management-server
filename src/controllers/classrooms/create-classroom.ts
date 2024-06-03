import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { prisma } from '../../lib/prisma'

export async function createClassroom(request: FastifyRequest, reply: FastifyReply) {
    const createClassroomBodySchema = z.object({
        classroom: z.string()
    })

    try {
        const { classroom } = createClassroomBodySchema.parse(request.body)

        const classroomAlreadyExists = await prisma.classroom.findUnique({
            where: {
                classroom
            }
        })

        if (classroomAlreadyExists) return reply.status(409).send({ message: 'Sala já cadastrada' })

        const _classroom = await prisma.classroom.create({
            data: {
                classroom
            }
        })

        return reply.status(201).send({ classroom: _classroom })
    } catch (err: any) {
        console.log(err)
        return reply.status(400).send({ message: 'Ocorreu um erro ao tentar cadastrar a sala', error: err.message  })
    }
}