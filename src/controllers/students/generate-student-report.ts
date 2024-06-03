import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../../lib/prisma'
import pdf from 'html-pdf-node'
import { htmlTemplate } from '../../utils/html-template'

export async function generateStudentReport(request: FastifyRequest, reply: FastifyReply) {
    try {
        const students = await prisma.student.findMany({
            select: {
                name: true,
                registration: true,
                classroom: {
                    select: {
                        classroom: true
                    }
                },
            },
            orderBy: {
                classroom: {
                    classroom: 'asc'
                }
            }
        })

        const htmlContent = htmlTemplate(students)

        const options = { format: 'A4' }

        const pdfBuffer = await pdf.generatePdf({ content: htmlContent }, options)

        reply.header('Content-Disposition', 'attachment; filename="relatorio.pdf"')
        reply.header('Content-Type', 'application/pdf')
        reply.send(pdfBuffer)
    } catch (err: any) {
        console.error(err);
        return reply.status(500).send({ message: 'Ocorreu um erro ao tentar gerar o relatório', error: err.message })
    }
}
