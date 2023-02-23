import { GraphQLObjectType, GraphQLString } from 'graphql';

import { login, signup } from '~/data/auth.server';
import type { AuthData } from '~/types';

import { UserType } from './types/user-type';

export const mutation = new GraphQLObjectType({
  fields: {
    login: {
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parentValue, { email, password }: AuthData) {
        const existingUser = await login({ email, password });

        return existingUser;
      },
      type: UserType
    },
    signup: {
      args: {
        email: {
          type: GraphQLString
        },
        password: { type: GraphQLString }
      },
      async resolve(parentValue, { email, password }: AuthData) {
        const user = await signup({ email, password });

        return user;
      },
      type: UserType
    }
  },
  name: 'Mutation'
});
