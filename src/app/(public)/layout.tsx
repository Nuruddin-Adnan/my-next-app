/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Breadcrumb, Layout, Menu, Button, Spin } from "antd";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useAppDispatch } from "@/redux/hook";
import { setPathName } from "@/redux/features/auth/authSlice";
const { Header, Content, Footer } = Layout;

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch: any = useAppDispatch();
  const { data: sessionData, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-full min-h-screen grid place-items-center">
        <Spin />
      </div>
    );
  }

  function handlePathName(e: any) {
    const pathname = e.key;
    if (pathname !== "auth/login") {
      // getPathName(pathname);
      dispatch(setPathName(pathname));
    }
  }

  const menuItems = [
    {
      key: "home",
      label: <Link href="/home">Home</Link>,
    },
    {
      key: "about",
      label: <Link href="/about">About</Link>,
    },
    {
      key: "upload-image",
      label: <Link href="/upload-image">Upload</Link>,
    },
    {
      key: "contact",
      label: <Link href="/contact">Contact</Link>,
    },
    {
      key: "service",
      label: <Link href="/service">Service</Link>,
    },
    {
      key: "my-profile",
      label: <Link href="/my-profile">My Profile</Link>,
    },
    {
      key: "dashboard",
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: "seller/dashboard",
      label: <Link href="/seller/dashboard">Seller Dashboard</Link>,
    },
    {
      key: "buyer/dashboard",
      label: <Link href="/buyer/dashboard">Buyer Dashboard</Link>,
    },
  ];

  return (
    <>
      <Layout className="layout min-h-screen my-0">
        <Header className="flex items-center justify-between">
          <div>
            <Link href="/">
              <img
                src="https://png.pngtree.com/element_pic/00/16/07/115783931601b5c.jpg"
                alt="logo"
                className="w-24"
              />
            </Link>
          </div>
          <Menu
            theme="dark"
            className="w-full"
            mode="horizontal"
            defaultSelectedKeys={["10"]}
            items={menuItems}
            onClick={(e) => handlePathName(e)}
          ></Menu>
          {sessionData ? (
            <Button type="primary" onClick={() => signOut()}>
              Signout
            </Button>
          ) : (
            <Button type="primary">
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">{children}</div>
        </Content>
        <Footer className="bg-black text-white text-center">
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}
