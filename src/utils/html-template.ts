interface StudentsProps {
    name: string
    registration: string
    classroom: { classroom: string }
}

export const htmlTemplate = (students: StudentsProps[]) => `
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RELATÓRIO DE ALUNOS</title>

        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
            }

            .container {
                width: 80%;
                margin: 0 auto;
                text-align: center;
            }

            h1 {
                margin-top: 1rem;
                text-align: center;
            }

            p {
                margin-top: 1rem;
                margin-bottom: 1rem;
                text-align: center;
            }

            tr {
                page-break-after: avoid; 
                page-break-before: avoid; 
            }

            table {
                width: 100%;
                border-collapse: collapse;
                page-break-inside: auto;
            }

            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }

            th {
                background-color: #f2f2f2;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>RELATÓRIO DE ALUNOS</h1>
            <p><strong>Escola:</strong> CETI Francisca Pereira de Sousa Morais</p>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Matrícula</th>
                        <th>Turma</th>
                    </tr>
                </thead>
                <tbody>
                    ${students.map(student => `
                        <tr>
                            <td>${student.name}</td>
                            <td>${student.registration}</td>
                            <td>${student.classroom.classroom}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="page-break"></div>
        </div>
    </body>
</html>
`