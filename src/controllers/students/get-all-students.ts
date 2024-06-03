import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../lib/prisma'
import z from 'zod'

export async function getAllStudents(request: FastifyRequest, reply: FastifyReply) {
    const getAllStudentsQuerySchema = z.object({
        page: z.string().nullish().default('0').transform(Number),
        query: z.string().optional(),
    })

    try {
        const { page, query } = getAllStudentsQuerySchema.parse(request.query)
        const offset = page > 0 ? (page - 1) * 20 : 0

        const [students, total] = await Promise.all([
            prisma.student.findMany({
                select: {
                    name: true,
                    registration: true,
                    classroom: {
                        select: {
                            id: true,
                            classroom: true
                        }
                    },
                },
                where: query ? {
                    name: {
                        contains: query,
                    }
                } : {},
                take: 20,
                skip: offset,
                orderBy: {
                    classroom_id: 'desc'
                }
            }),
            prisma.student.count()
        ])

        return reply.status(200).send({
            students,
            total
        })
    } catch (err: any) {
        console.log(err)
        return reply.status(400).send({ message: 'Ocorreu um erro ao tentar buscar os alunos', error: err.message  })
    }
}