import { GraphQLSchema } from 'graphql';

import { mutation } from './mutations';
import { RootQueryType } from './types/root-query-type';

export const schema = new GraphQLSchema({
  mutation,
  query: RootQueryType
});
