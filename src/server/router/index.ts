// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import groupsRouter from "./groups";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("groups.", groupsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
