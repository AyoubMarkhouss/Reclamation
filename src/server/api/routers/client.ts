import { z } from "zod";

import { createTRPCRouter, privateProducer } from "@/server/api/trpc";

export const clientRouter = createTRPCRouter({
  getAllMyReport: privateProducer.query(async ({ ctx }) => {
    const { db, session } = ctx;
    const allMyReport = await db.reports.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        usersId: session,
      },
      include: {
        Respond: {},
        Users: {},
      },
    });
    return allMyReport;
  }),
  giveNewReport: privateProducer
    .input(
      z.object({
        reportRadio: z.string(),
        reportObjet: z.string(),
        reportDetails: z.string(),
        reportList: z.string().optional().nullable(),
        option: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const { reportDetails, reportObjet, reportRadio, reportList, option } = input;
      const confirming = await db.reports.create({
        data: {
          reportDetails: reportDetails,
          reportObjet: reportObjet,
          usersId: session,
          reportList: reportList,
          reportRadio: reportRadio,
          option: option,
        },
      });
      return confirming;
    }),
  confirmMySelf: privateProducer
    .input(z.object({ code: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const { code } = input;
      const info = await db.users.update({
        where: {
          id: session,
          confirmationCode: code,
        },
        data: {
          confirmed: true,
          confirmationCode: null,
        },
      });
      return info;
    }),
});
