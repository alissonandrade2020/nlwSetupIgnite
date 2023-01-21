import dayjs from "dayjs";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    return [
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
      "Linkedin: https://www.linkedin.com/in/alisson-de-andrade-ara%C3%BAjo-160224190/",
    ];
  });

  app.get("/habits", async () => {
    const habits = await prisma.habit.findMany();

    return habits;
  });

  app.post("/habits", async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createHabitBody.parse(request.body);

    const today = dayjs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            };
          }),
        },
      },
    });
  });

  app.get("/day", async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(request.query);

    const parsedDate = dayjs(date).startOf("day");
    const weekDay = parsedDate.get("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findFirst({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits =
      day?.dayHabits.map((dayHabit) => {
        return dayHabit.habit_id;
      }) ?? [];

    return {
      possibleHabits,
      completedHabits,
    };
  });

  app.patch("/habits/:id/toggle", async (request) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = toggleHabitParams.parse(request.params);

    const today = dayjs().startOf("day").toDate();

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      });
    }
  });

  app.get('/summary', async () => {
    const summary = await prisma.$queryRaw`
      SELECT 
        d.id,
        d.date,
        (
          SELECT 
            cast(count(*) as float)
          FROM day_habits dh
          WHERE dh.day_id = d.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days hwd
          JOIN habits h
            ON h.id = hwd.habit_id
          WHERE
            hwd.week_day = extract(dow FROM d.date)
            AND h.created_at <= d.date
        ) as amount
      FROM days d
    `;

    return summary;
  });
}

// https://nlwsetupignite-production.up.railway.app/day?date=2023-01-20T14%3A00%3A00.000z
