import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { hash } from 'bcryptjs'
import { prisma } from '../../lib/prisma'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
        username: z.string().min(5).max(20),
        password: z.string().min(5).max(15)
    })

    try {
        const { username, password } = createUserBodySchema.parse(request.body)

        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (userAlreadyExists) return reply.status(409).send({ message: 'Já existe um usuário com esse username, tente outro.' })

        const user = await prisma.user.create({
            data: {
                username,
                password_hash: await hash(password, 8)
            }
        })

        const token = await reply.jwtSign(
            { sign: { sub: user.id } }
        )

        return reply
            .status(201)
            .send({
                token
            })
    } catch (err) {
        console.log(err)
        return reply.status(400).send({ error: 'Erro ao tentar criar usuário.' })
    }

}