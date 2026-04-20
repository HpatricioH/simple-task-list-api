import SchemaBuilder from '@pothos/core';
import { GraphQLContext } from '../server/context';

// Pothos builder to use across the schema.
export const builder = new SchemaBuilder<{
  Context: GraphQLContext;
}>({});