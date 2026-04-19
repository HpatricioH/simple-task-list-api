import type { GraphQLContext } from "../../server/context";
import { UpdateTaskArgs } from "./task-types";

export async function getTasks(ctx: GraphQLContext) {
  return ctx.prisma.task.findMany()
}

export async function getTask(ctx: GraphQLContext, id: string) {
  return ctx.prisma.task.findUnique({
    where: {id: id}
  })
}

export async function createTask(ctx: GraphQLContext, title: string) {
  return ctx.prisma.task.create({
    data: {
      title,
      completed: false,
    }
  })  
}

export async function updateTask(ctx: GraphQLContext, args: UpdateTaskArgs) {
  return ctx.prisma.task.update({
    where: { id: args.id }, 
    data: {
      completed: args.completed || false
    }
  })
}

export async function deleteTask(ctx: GraphQLContext, id: string) {
  return ctx.prisma.task.delete({
    where: { id: id}
  })
}