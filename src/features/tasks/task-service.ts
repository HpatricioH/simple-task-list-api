import { errorGraphQLHandler } from "../../lib/errors";
import type { GraphQLContext } from "../../server/context";
import { CreateTaskArgs, TaskByIdArgs, UpdateTaskArgs } from "./task-types";
import { createTaskSchema, deleteTaskSchema, updateTaskSchema } from "./task-validations";

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
    const validatedInput = createTaskSchema.parse(input)

    return ctx.prisma.task.create({
      data: {
        title: validatedInput.title,
        completed: false,
      }
    })  
  } catch (error) {
    throw errorGraphQLHandler(error)
  }
}

export async function updateTask(ctx: GraphQLContext, input: UpdateTaskArgs) {
  try {
    const validatedInput = updateTaskSchema.parse(input)

    return ctx.prisma.task.update({
      where: { id: validatedInput.id }, 
      data: {
        completed: validatedInput.completed || false
      }
    })
  } catch (error) {
    throw errorGraphQLHandler(error)
  }
}

export async function deleteTask(ctx: GraphQLContext, input: TaskByIdArgs) {
  try {
    const validatedInput = deleteTaskSchema.parse(input)

    return ctx.prisma.task.delete({
      where: { id: validatedInput.id}
    })
  } catch (error) {
    throw errorGraphQLHandler(error)
  }
}