import { MembershipRole } from '@prisma/client'
import { z } from 'zod'
import { createProtectedRouter } from './context'
import { prisma } from '../db/client'
import { TRPCError } from '@trpc/server'

const groupsRouter = createProtectedRouter()
  .query('getGroup', {
    input: z.string().cuid(),
    async resolve({ ctx, input }) {
      return prisma.group.findFirstOrThrow({
        where: {
          id: input
        },
        include: {
          comments: {
            take: 10
          },
          memberships: {
            take: 5
          }
        }
      })
    }
  })
  .query('listGroups', {
    async resolve({ ctx }) {
      const userId = ctx.session.user.id
      const memberships = await prisma.membership.findMany({
        where: {
          userId
        },
        include: {
          group: {}
        }
      })
      return memberships.map(membership => ({
        ...membership.group,
        role: membership.role
      }))
    }
  })
  .mutation('createGroup', {
    input: z.object({
      name: z.string(),
      description: z.string(),
      location: z.string()
    }),
    async resolve({ ctx, input }) {
      const newGroup = await prisma.group.create({
        data: {
          name: input.name,
          description: input.description,
          location: input.location
        }
      })
      await prisma.membership.create({
        data: {
          groupId: newGroup.id,
          userId: ctx.session.user.id,
          role: MembershipRole.Admin
        }
      })
      return { groupId: newGroup.id }
    }
  })
  .mutation('deleteGroup', {
    input: z.object({
      groupId: z.string().cuid()
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id
      const groupId = input.groupId
      const membership = await prisma.membership.findFirst({
        where: {
          userId,
          groupId
        }
      })
      const membershipRole = membership?.role
      if (membershipRole !== MembershipRole.Admin) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'must be admin to delete group'
        })
      }
      await prisma.group.delete({
        where: {
          id: groupId
        }
      })
    }
  })

export default groupsRouter
