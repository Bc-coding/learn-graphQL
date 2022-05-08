import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { fakeDatabase } from "../../FakeDatabase";
import { Post } from "./Post";

export const Author = new GraphQLObjectType({
  name: "Author",
  description: "All details of an author on the website",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },

    posts: {
      type: new GraphQLList(Post), // GraphQL will know its a list of posts
      resolve: (author) => {
        return fakeDatabase.getPostsOfAuthor(author.id);
      },
    },
  }),
});
