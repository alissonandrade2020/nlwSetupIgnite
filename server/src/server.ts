import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

const app = Fastify()
const prisma = new PrismaClient()

app.register(cors)

app.get("/perfil", (request, response) => {
  const query = request.query;
  return ([
      " ----------------  < NLW >  ----------------",
      " |                                         |",
      " |                 SETUP                   |",
      " |                                         |",
      " ----------- < Trilha Node.js > -----------",
      " |                                         |",
      " |                  API                    |",
      " |                                         |",
      " ------------- < BORA CODAR > -------------",
      "                                           ",
      "Nome: Alisson de Andrade Araújo",
      "Formação: Análise e Desenvolvimento de Sistemas",
      "Descrição: Desenvolvedor Back-end, Front-end e Mobile",
      "Site: http://alissondeandradearaujo.000webhostapp.com/",
      "Currículo Lattes: http://lattes.cnpq.br/7594653859194302/",
      "Github: https://github.com/alissonandrade2020", 
      "Rocketseat: https://app.rocketseat.com.br/me/alissondeandradearaujo", 
      "Linkedin: https://www.linkedin.com/in/alisson-de-andrade-ara%C3%BAjo-160224190/"])
});

app.get('/', async () => {
  const habits = await prisma.habit.findMany()

  return habits
})

app.listen({
  port: 3333, 
}).then(() => {
  console.log(" 🚀 Started Server !!  Agora sim, pode rodar o Frontend ! =]");
})

