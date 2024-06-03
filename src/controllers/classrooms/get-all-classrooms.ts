import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../lib/prisma'

export async function getAllClassrooms(request: FastifyRequest, reply: FastifyReply) {
    try {
        const classrooms = await prisma.classroom.findMany({
            select: {
                classroom: true,
                id: true
            }
        })

        return reply.status(200).send({ classrooms })
    } catch (err: any) {
        console.log(err)
        return reply.status(400).send({ message: 'Ocorreu um erro ao tentar buscar as salas', error: err.message  })
    }
}