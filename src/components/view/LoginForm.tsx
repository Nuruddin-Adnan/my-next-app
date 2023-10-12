"use client";

import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

type FieldType = {
  email?: string;
  password?: string;
};

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loadings, setLoadings] = useState<boolean>(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      setLoadings(true);
      const result = await signIn("your app name", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: `/`,
      });

      if (!result?.ok) {
        setErrorMessage("Credentials Error");
        setLoadings(false);
        return false;
      }

      if (result?.ok && !result.error) {
        setErrorMessage("");
        setLoadings(false);
        router.push("/");
      }
    } catch (error) {
      setLoadings(false);
      setErrorMessage(`Error: ${error}`);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      className="w-full max-w-2xl"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      {errorMessage && (
        <Form.Item<FieldType> wrapperCol={{ offset: 8, span: 16 }}>
          <p className="bg-red-600 text-white px-4 py-2">{errorMessage}</p>
        </Form.Item>
      )}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <span>Do not have an account?</span>
        <Link href="/auth/signup"> Sign Up</Link>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loadings}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
