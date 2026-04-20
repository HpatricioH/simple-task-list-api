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

// ---------------------------------------------------------------
// Queries
// ---------------------------------------------------------------

builder.queryField('tasks', (t) => 
  t.field({
    type:[Task],
    resolve: async (_parent, _args, ctx: GraphQLContext) => {
      return getTasks(ctx)
    }
  })
)

builder.queryField('task', (t) => 
 t.field({
  type: Task,
  args: {
    id: t.arg.string({ required: true })
  }, 
  resolve: async (_parent, args, ctx: GraphQLContext) => {
    return getTask(ctx, args)
  }
 })
)


// ---------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------

builder.mutationField('createTask', (t) => 
  t.field({
    type: Task,
    args: {
      title: t.arg.string({ required: true },)
    },
    resolve: async (_parent, args, ctx: GraphQLContext) => {
      return createTask(ctx, args)
    }
  })
)
 
builder.mutationField('updateTask', (t) => 
  t.field({
    type: Task,
    args: {
      id: t.arg.string({ required: true }),
      title: t.arg.string(),
      completed: t.arg.boolean()
    },
    resolve: async (_parent, args, ctx: GraphQLContext) => {
      return updateTask(ctx, args)
    }
  })
)

builder.mutationField('deleteTask', (t) =>
  t.field({
    type: Task,
    args: {
      id: t.arg.string({ required: true })
    },
    resolve: async (_parent, args, ctx: GraphQLContext) => {
      return deleteTask(ctx, args)
    }
  })
)