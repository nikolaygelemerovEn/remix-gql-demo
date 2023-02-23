import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
  fields: {
    email: { type: GraphQLString },
    id: { type: GraphQLID }
  },
  name: 'UserType'
});
