import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'
import { env } from './env'
import { usersRoutes } from './routes/usersRoutes'
import { studentsRoutes } from './routes/studentsRoutes'
import { classroomsRoutes } from './routes/classroomsRoutes'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: '7d',
    }
})

app.register(fastifyCors)

app.register(usersRoutes)
app.register(studentsRoutes)
app.register(classroomsRoutes)