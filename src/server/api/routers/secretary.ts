import { z } from "zod";

import { createTRPCRouter, privateProducer } from "@/server/api/trpc";

export const secretaryRouter = createTRPCRouter({
  getAllUsers: privateProducer.query(async ({ ctx }) => {
    const { db } = ctx;
    const allUsers = await db.users.findMany({
      where: {
        role: "client",
        confirmed: false,
      },
    });
    return allUsers;
  }),
  confirmUser: privateProducer
    .input(z.object({ clientId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const { clientId } = input;
      const confirming = await db.users.update({
        where: {
          id: clientId,
        },
        data: {
          confirmed: true,
          confirmationCode: null,
        },
      });
      return confirming;
    }),
});
