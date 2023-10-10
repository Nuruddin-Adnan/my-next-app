import getSinglePost from "@/services/posts/getSinglePost";
import React from "react";

export default async function PostDetails({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const post = await getSinglePost(postId);

  return (
    <div className="container mx-auto">
      <div className="w-72 bg-white p-5">
        <h2>{post?.title}</h2>
        <p>{post?.body}</p>
      </div>
    </div>
  );
}
