import React from "react";
import Layout from "../../components/pageLayout/pageLayout";
import { ReactSession } from "react-client-session";
import AdminPanel from "../../components/admin/adminPanel";
import { Collapse } from "antd";
import getAllUsers from '../../components/helper/userApiUtil'
const { Panel } = Collapse;
export default function Admin() {

  



  return (
    <div>
      <Collapse defaultActiveKey={["1"]} >
        <Panel header="Changes on places" key="1">
          <AdminPanel />
        </Panel>
        <Panel header="Changes on events" key="2">
        <AdminPanel />
        </Panel>
        <Panel header="User management" key="3">
        <AdminPanel />
        </Panel>
      </Collapse>
    </div>
  );
}

export async function getStaticProps() {
  const usersLst = await getAllUsers()
  
  return {
    props: {
      userType: "admin",
    },
  };
}
