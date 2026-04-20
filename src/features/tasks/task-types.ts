export type CreateTaskArgs = {
  title: string 
}

export type UpdateTaskArgs = {
  id: string
  completed?: boolean | null | undefined
}

export type TaskByIdArgs = {
  id: string
}
