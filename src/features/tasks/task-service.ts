import { errorGraphQLHandler } from "../../lib/errors";
import type { GraphQLContext } from "../../server/context";
import { CreateTaskArgs, TaskByIdArgs, UpdateTaskArgs } from "./task-types";
import { createTaskSchema, deleteTaskSchema, updateTaskSchema } from "./task-validations";

// Fetch all tasks 
export async function getTasks(ctx: GraphQLContext) {
  try {
    return (await ctx.prisma.task.findMany())
  } catch (error) {
    throw errorGraphQLHandler(error)
  }
}

// Fetch a single task by ID 
export async function getTask(ctx: GraphQLContext, input: TaskByIdArgs) {
  try {
    return ctx.prisma.task.findUnique({
      where: {id: input.id}
    })  
  } catch (error) {
    throw errorGraphQLHandler(error)
  }
}

// Create a new task as incomplete by default
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

// Update a task's title and/or completed status
export async function updateTask(ctx: GraphQLContext, input: UpdateTaskArgs) {
  try {
    const validatedInput = updateTaskSchema.parse(input)

    return ctx.prisma.task.update({
      where: { id: validatedInput.id }, 
      data: {
        title: validatedInput.title,
        completed: validatedInput.completed || false
      }
    })
  } catch (error) {
    throw errorGraphQLHandler(error)
  }
}

// Delete a task by ID 
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