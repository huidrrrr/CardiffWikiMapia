import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  CompassOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import { ReactSession } from "react-client-session";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items1 = [
  getItem("User", "user", <UserOutlined />, [
    getItem(
      "Info",
      "g1",
      null,
      [
        getItem("Home", "home"),
        getItem("Profile", "profile"),
        getItem("Setting", "setting"),
        getItem("Log in/out", "logInOut"),
      ],
      "group"
    ),
  ]),
  getItem("Map", "map", <CompassOutlined />, [
    getItem("Browse Places", "browsePlace"),
    getItem("Add Places", "addPlaceMap"),
  ]),
  getItem("Places", "places", <UnorderedListOutlined />, [
    getItem("Places List", "placeList"),
    getItem("Add Places", "addPlaceList"),
  ]),
];

export default function PageLayout(props) {
  const { pageKeyName } = props;
  let defaultOpenKeys = ["user"];
  let defaultSelectedKeys = ["home"];

  let path = "";
  const onClick = (e) => {
    const { keyPath } = e;
    console.log(keyPath);
    switch (keyPath[1]) {
      case "user":
        if (keyPath[0] === "home") {
          path = `/`;
          Router.push(path);
        } else if (keyPath[0] === "logInOut") {
          const usernameIsValid = ReactSession.get("username");
          if (!usernameIsValid) {
            console.log("go login");
            path = `/logInOut/login`;
            Router.push(path);
          } else {
            path = `/logInOut/logout`;
            Router.push(path);
          }
        }

        break;

      case "map":
        path = `/placeOnMap/${keyPath[0]}`;
        Router.push(path);
        break;

      case "places":
        path = `/placeOnList/${keyPath[0]}`;
        Router.push(path);
        break;

      default:
        break;
    }
  };

  return (
    <Layout>
      <Header
        className="header"
        style={{ color: "white", display: "flex", fontSize: "xx-large" }}
      >
        <Link className="logo" href="/">
          WikiMapia
        </Link>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={defaultOpenKeys}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items1}
            onClick={onClick}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          ></Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}