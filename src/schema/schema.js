import { graphql, GraphQLObjectType, GraphQLSchema } from "graphql";
import posts from "./queries/posts";
import post from "./queries/post";
import author from "./queries/author";

import addPost from "./mutation/addPost";
import addComment from "./mutation/addComment";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Rootquery",
    fields: () => ({
      ...post,
      ...posts,
      ...author,
    }), // return an object
  }),
  mutation: new GraphQLObjectType({
    name: "Rootmutation",
    fields: () => ({
      ...addComment,
      ...addPost,
    }),
  }),
});

export default schema;
