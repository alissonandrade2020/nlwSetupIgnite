import dayjs from "dayjs"
import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "./lib/prisma"

export async function appRoutes(app: FastifyInstance) {
  app.get("/", async () => {
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

  app.post('/habits', async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(
        z.number().min(0).max(6)
      ),
    })

    const { title, weekDays } = createHabitBody.parse(request.body)

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            }
          }),
        }
      }
    })
  })

  app.get('/day', async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    })

    const { date } = getDayParams.parse(request.query)

    const parsedDate = dayjs(date).startOf('day')
    const weekDay = parsedDate.get('day')

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          }
        }
      },
    })

    const day = await prisma.day.findFirst({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      }
    })

    const completedHabits = day?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id
    })

    return {
      possibleHabits,
      completedHabits,
    }
  })
}

