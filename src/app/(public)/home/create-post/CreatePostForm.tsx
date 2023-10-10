"use client";

import createPost from "@/services/posts/create-post";
import { PoweroffOutlined } from "@ant-design/icons";
import { message, Button, Form, Input } from "antd";
import { useState } from "react";

type FieldType = {
  title?: string;
  userId?: number;
  body?: string;
};

const CreatePostForm = ({ formAction }: any) => {
  const [loadings, setLoadings] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    setLoadings(true);
    await createPost(values);
    setLoadings(false);
    messageApi.success("Successfully created post");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}

      <Form
        action={formAction}
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item<FieldType>
          label="Post title"
          name="title"
          rules={[{ required: true, message: "Please input post title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Post body"
          name="body"
          rules={[{ required: true, message: "Please input post body!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="User ID"
          name="userId"
          rules={[{ required: true, message: "Please input user Id" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loadings}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreatePostForm;
