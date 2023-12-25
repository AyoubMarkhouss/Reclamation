import { userRouter } from "@/server/api/routers/user";
import { createTRPCRouter } from "@/server/api/trpc";
import { secretaryRouter } from "./routers/secretary";
import { clientRouter } from "./routers/client";
import { adminRouter } from "./routers/admin";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  client: clientRouter,
  secretary: secretaryRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
