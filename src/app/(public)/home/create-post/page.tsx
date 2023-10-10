import { Card } from "antd";
import CreatePostForm from "./CreatePostForm";

export default function CreatePost() {
  return (
    <Card title="Create new post" bordered={false} className="max-w-lg">
      <CreatePostForm />
    </Card>
  );
}
