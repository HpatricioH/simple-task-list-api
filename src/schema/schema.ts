import { builder } from './builder';
// Register all feature schemas
import '../features/tasks/task-schema.js'

builder.queryType({})
builder.mutationType({})

export const schema = builder.toSchema();