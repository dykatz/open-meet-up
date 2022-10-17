import { z } from "zod";
import { createProtectedRouter } from "./context";
import { prisma } from "../db/client";
import { MembershipRole } from "@prisma/client";

const groupsRouter = createProtectedRouter()
  .query("getGroup", {
    input: z.string().cuid(),
    async resolve({ ctx, input }) {
      return prisma.group.findFirstOrThrow({
        where: {
          id: input,
        },
        include: {
          comments: {
            take: 10,
          },
          memberships: {
            take: 5,
          },
        }
      });
    },
  })
  .query("listGroups", {
    resolve({ ctx }) {
      const userId = ctx.session.user.id;
      return prisma.membership.findMany({
        where: {
          userId
        },
        include: {
          group: {
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      });
    },
  })
  .mutation("createGroup", {
    input: z.object({
      name: z.string(),
      description: z.string(),
      location: z.string(),
    }),
    async resolve({ ctx, input }) {
      const newGroup = await prisma.group.create({
        data: {
          name: input.name,
          description: input.description,
        }
      });
      await prisma.membership.create({
        data: {
          groupId: newGroup.id,
          userId: ctx.session.user.id,
          role: MembershipRole.Admin,
        },
      });
      return {groupId: newGroup.id};
    },
  });

export default groupsRouter;
