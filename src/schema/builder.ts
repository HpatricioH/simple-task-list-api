import SchemaBuilder from '@pothos/core';
import { GraphQLContext } from '../server/context';

export const builder = new SchemaBuilder<{
  // Type of the context object
  Context: GraphQLContext;
}>({});