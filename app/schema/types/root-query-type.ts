import { GraphQLObjectType } from 'graphql';

import { getUserFromSession } from '~/data/auth.server';

import { UserType } from './user-type';

export const RootQueryType = new GraphQLObjectType({
  fields: () => ({
    user: {
      async resolve(parentValue, args, { req }) {
        const user = await getUserFromSession(req);

        return user;
      },
      type: UserType
    }
  }),
  name: 'RootQueryType'
});
