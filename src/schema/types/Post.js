import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { fakeDatabase } from "../../FakeDatabase";
import { Author } from "./Author";
import { Comment } from "./Comment";

export const Post = new GraphQLObjectType({
  name: "Post",
  description: "Details of a post",
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: {
      type: Author,
      resolve: (post) => {
        return fakeDatabase.getAuthor(post.author);
      },
    },
    comments: {
      type: new GraphQLList(Comment), // GraphQL will know its a list of comments
      resolve: (post) => {
        return fakeDatabase.getCommentsForPost(post.id);
      },
    },
  }),
});

// INPUT OBJECT TYPE
export const PostInputType = new GraphQLInputObjectType({
  name: "PostInput",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    author: { type: new GraphQLNonNull(GraphQLString) },
  },
});
