import { z } from "zod";

import { createTRPCRouter, privateProducer } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  createUser: privateProducer
    .input(
      z.object({
        fullName: z.string(),
        address: z.string(),
        phoneNumber: z.string(),
        confirmationCode: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { address, fullName, phoneNumber, confirmationCode } = input;
      const { db, session } = ctx;
      const createAccount = await db.users.create({
        data: {
          address: address,
          fullName: fullName,
          phoneNumber: phoneNumber,
          id: session,
          confirmationCode: confirmationCode,
          role: "client",
        },
      });
      return createAccount;
    }),
  findUser: privateProducer.query(async ({ ctx }) => {
    const { session, db } = ctx;
    const readAccount = await db.users.findUnique({
      where: {
        id: session,
      },
    });
    return readAccount;
  }),
  confirmationProcess: privateProducer
    .input(z.object({ code: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { db, session } = ctx;
      const { code } = input;
      const confirmation = await db.users.update({
        where: {
          id: session,
          confirmationCode: code,
        },
        data: {
          confirmed: true,
          confirmationCode: null,
        },
      });
      return confirmation;
    }),
});
