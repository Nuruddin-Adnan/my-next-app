import Link from "next/link";
import { Button } from "antd";
import getPosts from "@/services/posts/getPosts";

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main>
      <Button type="primary" size="large" className="ml-auto block">
        <Link href={"/home/create-post"}>Create Post</Link>
      </Button>
      <table>
        <thead>
          <tr>
            <th>User Id</th>
            <th>Post Id</th>
            <th>Title</th>
            <th>body</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post: any) => (
            <tr key={post.id}>
              <td> {post?.userId} </td>
              <td> {post?.id} </td>
              <td> {post?.title} </td>
              <td> {post?.body} </td>
              <td>
                <Link href={`./home/${post.id}`} className="btn">
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
