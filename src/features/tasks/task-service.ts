import { errorGraphQLHandler } from "../../lib/errors";
import type { GraphQLContext } from "../../server/context";
import { CreateTaskArgs, TaskByIdArgs, UpdateTaskArgs } from "./task-types";

export async function getTasks(ctx: GraphQLContext) {
  try {
    return ctx.prisma.task.findMany()  
  } catch (error) {
    throw errorGraphQLHandler(error)
  }
}

export async function getTask(ctx: GraphQLContext, input: TaskByIdArgs) {
  try {
    return ctx.prisma.task.findUnique({
      where: {id: input.id}
    })  
  } catch (error) {
    throw errorGraphQLHandler(error)
  }
}

export async function createTask(ctx: GraphQLContext, input: CreateTaskArgs) {
  try {
    return ctx.prisma.task.create({
      data: {
        title: input.title,
        completed: false,
      }
    })  
  } catch (error) {
    throw errorGraphQLHandler(error)
  }
}

export async function updateTask(ctx: GraphQLContext, input: UpdateTaskArgs) {
  try {
    return ctx.prisma.task.update({
      where: { id: input.id }, 
      data: {
        completed: input.completed || false
      }
    })
  } catch (error) {
    throw errorGraphQLHandler(error)
  }
}

export async function deleteTask(ctx: GraphQLContext, input: TaskByIdArgs) {
  try {
    return ctx.prisma.task.delete({
      where: { id: input.id}
    })
  } catch (error) {
    throw errorGraphQLHandler(error)
  }
}