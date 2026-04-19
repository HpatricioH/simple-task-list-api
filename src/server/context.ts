import { prisma } from '../db/prisma.js'
import { PrismaClient } from "../../generated/prisma/client.js"

export type GraphQLContext = {
  prisma: PrismaClient
}

export async function createContext(): Promise<GraphQLContext> {
  return {
    prisma
  }
}