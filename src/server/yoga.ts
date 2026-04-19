import { createYoga } from 'graphql-yoga';
import { schema } from '../schema/schema'
import { createContext } from './context';

export const yoga = createYoga({
  schema,
  context: createContext
})