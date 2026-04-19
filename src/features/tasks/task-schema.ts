import { builder } from "../../schema/builder";
import type { Task as TypeSchemaModel } from '../../../generated/prisma/client'
import { GraphQLContext } from "../../server/context";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "./task-service";

const Task = builder.objectRef<TypeSchemaModel>('Task')

Task.implement({
  fields: (t) => ({
    id: t.exposeString('id'),
    title: t.exposeString('title'),
    completed: t.exposeBoolean('completed')
  })
})

// Get all Tasks
builder.queryField('tasks', (t) => 
  t.field({
    type:[Task],
    resolve: async (_parent, _args, ctx: GraphQLContext) => {
      return getTasks(ctx)
    }
  })
)

// Get a task 
builder.queryField('task', (t) => 
 t.field({
  type: Task,
  args: {
    id: t.arg.string({ required: true })
  }, 
  resolve: async (_parent, args, ctx: GraphQLContext) => {
    return getTask(ctx, args.id)
  }
 })
)

// Create Tasks
builder.mutationField('createTask', (t) => 
  t.field({
    type: Task,
    args: {
      title: t.arg.string({ required: true },)
    },
    resolve: async (_parent, args, ctx: GraphQLContext) => {
      return createTask(ctx, args.title)
    }
  })
)

// Update tasks 
builder.mutationField('updateTask', (t) => 
  t.field({
    type: Task,
    args: {
      id: t.arg.string({ required: true }),
      completed: t.arg.boolean()
    },
    resolve: async (_parent, args, ctx: GraphQLContext) => {
      return updateTask(ctx, args)
    }
  })
)

// Delete Tasks
builder.mutationField('deleteTask', (t) =>
  t.field({
    type: Task,
    args: {
      id: t.arg.string({ required: true })
    },
    resolve: async (_parent, args, ctx: GraphQLContext) => {
      return deleteTask(ctx, args.id)
    }
  })
)