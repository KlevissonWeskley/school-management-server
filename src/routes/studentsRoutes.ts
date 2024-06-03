import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../controllers/_middlewares/verify-jwt'
import { createStudent } from '../controllers/students/create-student'
import { getAllStudents } from '../controllers/students/get-all-students'
import { generateStudentReport } from '../controllers/students/generate-student-report'

export async function studentsRoutes(app: FastifyInstance) {
    app.get('/students', { onRequest: [verifyJWT] }, getAllStudents)
    app.post('/students', { onRequest: [verifyJWT] }, createStudent)
    app.get('/students/report', generateStudentReport)
}