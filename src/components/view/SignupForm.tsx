"use client";

import { Button, Form, Input, Select, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { IUser } from "@/interfaces/shared";
import createUser from "@/services/auth/createUser";

type FieldType = IUser;

export default function SignupForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loadings, setLoadings] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();



  const onFinish = async (values: any) => {
    setLoadings(true);
    if (values.password !== values.confirmPpassword) {
      messageApi.error("Confirm Password doesn't match!");
      setLoadings(false);
      return false;
    }
    values.name = {
      firstName: values.firstName,
      lastName: values.lastName,
    };

    delete values.firstName;
    delete values.lastName;
    delete values.confirmPpassword;

    try {
      setLoadings(true);
      const result = await createUser(values);


      if (result.success) {
        messageApi.success("User created successfully!");
        setLoadings(false);
        router.push("/auth/login");
      } else {
        result?.errorMessages.map((errorMessage: any) =>
          messageApi.error(`${errorMessage?.path} ${errorMessage.message}`)
        );
        setLoadings(false);
      }
    } catch (error) {
      setLoadings(false);
      setErrorMessage(`${error}`);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
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
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input first name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input last name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="User Role"
          name="role"
          rules={[{ required: true, message: "Please select a user role!" }]}
        >
          <Select
            defaultValue=""
            options={[
              { value: "general_user", label: "general user" },
              { value: "seller", label: "seller" },
              { value: "buyer", label: "buyer" },
            ]}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Confirm Password"
          name="confirmPpassword"
          rules={[
            { required: true, message: "Please input confirm password!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {errorMessage && (
          <Form.Item<FieldType> wrapperCol={{ offset: 8, span: 16 }}>
            <p className="bg-red-600 text-white px-4 py-2">{errorMessage}</p>
          </Form.Item>
        )}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <span>Already have an account?</span>
          <Link href="/auth/login"> Login</Link>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loadings}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
