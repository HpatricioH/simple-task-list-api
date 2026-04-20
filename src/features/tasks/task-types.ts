export type CreateTaskArgs = {
  title: string 
}

export type UpdateTaskArgs = {
  id: string
  title?: string | null | undefined
  completed?: boolean | null | undefined
}

export type TaskByIdArgs = {
  id: string
}
