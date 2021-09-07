import React from "react";
import Post from "../components/Post";

const AllPosts = (props) => {
  return props.posts.map((post) => <Post post={post} key={post.id} />);
};

export default AllPosts;
