import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../controllers/_middlewares/verify-jwt'
import { createClassroom } from '../controllers/classrooms/create-classroom'
import { getAllClassrooms } from '../controllers/classrooms/get-all-classrooms'

export async function classroomsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/classrooms', getAllClassrooms)
    app.post('/classrooms', createClassroom)
}