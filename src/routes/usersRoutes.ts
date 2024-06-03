import { FastifyInstance } from 'fastify'
import { createUser } from '../controllers/users/create-user'
import { authenticate } from '../controllers/users/authenticate-user'

export async function usersRoutes(app: FastifyInstance) {
    app.get('/users', () => 'Hello')
    app.post('/users', createUser)
    app.post('/users/login', authenticate)
}