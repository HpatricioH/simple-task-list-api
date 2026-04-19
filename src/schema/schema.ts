import { builder } from './builder';

import '../features/tasks/task-schema.js'

builder.queryType({})
builder.mutationType({})

export const schema = builder.toSchema();