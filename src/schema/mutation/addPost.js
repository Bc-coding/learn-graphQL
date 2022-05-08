import { GraphQLNonNull, GraphQLInt } from "graphql";
import { fakeDatabase } from "../../FakeDatabase";
import { Post, PostInputType } from "../types/Post";

export default {
  addPost: {
    type: Post,
    description: "Creates a new blog post",
    args: {
      //   id: { type: new GraphQLNonNull(GraphQLInt) },
      post: { type: PostInputType },
    },
    resolve: function (parent, { post }) {
      return fakeDatabase.addNewBlogPost(post);
    },
  },
};
