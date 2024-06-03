import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { compare } from 'bcryptjs'
import { prisma } from '../../lib/prisma'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
        username: z.string().min(5).max(20),
        password: z.string().min(5).max(15)
    })

    try {
        const { username, password } = createUserBodySchema.parse(request.body)

        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (!user) return reply.code(401).send({ error: 'Usuário ou senha inválidos.' })


        const isPasswordValid  = await compare(password, user.password_hash)

        if (!isPasswordValid) return reply.code(401).send({ error: 'Usuário ou senha inválidos.' })

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
        return reply.code(400).send({ error: 'Erro ao autenticar usuário.' })
    }
}