import React from "react";
import { HashRouter } from "react-router-dom";
import Router from "../../router";
import { Layout, Menu } from "antd";
import routes from "../../router/routes";
import "./index.css";

const { Header, Content, Footer } = Layout;

const Main: React.FC = () => {
  const items = [
    { label: "Home", key: "Home" },
    { label: "DashBoard", key: "DashBoard" },
    {
      label: "ServiceManager",
      key: "ServiceManager",
      children: [
        { label: "PointManager", key: "PointManager" },
        { label: "PointHubManager", key: "PointHubManager" },
        { label: "PointHubSelecterManager", key: "PointHubSelecterManager" },
        { label: "QueueManager", key: "QueueManager" },
      ],
    },
  ];

  const routeLink = (routeName: string) => {
    routes.forEach((routeItem) => {
      if (routeName == routeItem.name) {
        window.location.hash = routeItem.path;
      }
    });
  };

  return (
    <Layout>
      <Header className="bg">
        <div className="logo" style={{ color: "#3366CC" }}>
          DataHubServiceManager
        </div>
        <Menu
          className="menu"
          mode="horizontal"
          items={items}
          onClick={(e) => {
            routeLink(e.key);
          }}
          // items={routes.map((_, index) => {
          // const key = index;
          // return {
          // key,
          // label: routes[index].name,
          // };
          // })}
          // onClick={(e)=>{
          //console.log(menuItem[Number(e.key)]);
          // let url = routes[Number(e.key)].path;
          // window.location.hash = url;
          // }}
        />
      </Header>

      <Content className="bg" style={{ padding: "24px" }}>
        <HashRouter>
          <Router />
        </HashRouter>
      </Content>

      <Footer className="bg" style={{ textAlign: "center" }}>
        DataHubServiceManager ©2022 Created by YukiTechSoftware
      </Footer>
    </Layout>
  );
};

export default Main;
