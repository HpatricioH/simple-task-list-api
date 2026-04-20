import { GraphQLError } from 'graphql'
import { ZodError } from 'zod'

/**
 * Reusable helper to handle user errors vs server errors.
 * Using zod for user input validation and
 * other errors are server errors. 
 */
export function errorGraphQLHandler (error: unknown): GraphQLError {
  
  if(error instanceof ZodError) {
    return new GraphQLError(error.issues[0]?.message ?? 'Invalid input', {
      extensions: {
        code: 'BAD_USER_INPUT'
      },
    })
  }

  return new GraphQLError('Internal server error', {
    extensions: {
      code: 'SERVER_ERROR'
    }
  })
}