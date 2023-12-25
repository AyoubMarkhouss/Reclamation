import { z } from "zod";

import { createTRPCRouter, privateProducer } from "@/server/api/trpc";

export const adminRouter = createTRPCRouter({
  getFewReports: privateProducer
    .input(z.object({ label: z.string() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { label } = input;
      const allReports = await db.reports.findMany({
        where: {
          answered: false,
          ignore: false,
          option: label,
        },
        include: {
          Users: {},
        },
      });
      return allReports;
    }),
  getAllReports: privateProducer.query(async ({ ctx }) => {
    const { db } = ctx;
    const allReports = await db.reports.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        answered: false,
        ignore: false,
      },
    });
    return allReports;
  }),
  findUniqueReport: privateProducer
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { id } = input;
      const oneReport = await db.reports.findUnique({
        where: {
          id: id,
        },
        include: {
          Respond: {},
          Users: {},
        },
      });
      return oneReport;
    }),
  createAnswer: privateProducer
    .input(
      z.object({
        label: z.string(),
        description: z.string(),
        reportId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const { description, label, reportId } = input;
      const createAnswer = await db.respond.create({
        data: {
          reportsId: reportId,
          replyLable: label,
          respond: description,
        },
      });
      await db.reports.update({
        where: {
          id: reportId,
        },
        data: {
          answered: true,
        },
      });
      return createAnswer;
    }),
});
