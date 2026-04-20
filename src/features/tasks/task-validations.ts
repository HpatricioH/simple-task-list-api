import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less')
})

export const updateTaskSchema = z.object({
  id: z.string().min(1, 'Task id is required'),
  title: z.string().trim().min(1).max(100).optional(),
  completed: z.boolean().optional()
})

export const deleteTaskSchema = z.object({
  id: z.string().min(1, 'Task id is required')
})