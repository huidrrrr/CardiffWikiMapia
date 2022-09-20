import React from "react";
import Layout from "../../components/pageLayout/pageLayout";
import { ReactSession } from "react-client-session";
import UsersTable from "../../components/admin/usersTable";
import PlaceTable from "../../components/admin/placesTable";
import { Collapse } from "antd";
import { getAllDraftPlace,getAllDraftEvents } from "../../components/helper/apiUtil";
import { getAllUsers } from "../../components/helper/userApiUtil";
import EventsTable from "../../components/admin/eventsTable";
const { Panel } = Collapse;
export default function Admin(props) {
  const { usersLst, placeDraftLst,eventDraftLst } = props;
  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="Changes on places" key="1">
          <PlaceTable placeDraftLst={placeDraftLst} />
        </Panel>
        <Panel header="Changes on events" key="2">
          <EventsTable eventDraftLst={eventDraftLst} />
        </Panel>
        <Panel header="User management" key="3">
          <UsersTable usersLst={usersLst} />
        </Panel>
      </Collapse>
    </div>
  );
}

export async function getStaticProps() {
  const usersLst = await getAllUsers();
  const placeDraftLst = await getAllDraftPlace();
const eventDraftLst = await getAllDraftEvents();



  return {
    props: {
      eventDraftLst:eventDraftLst,
      placeDraftLst: placeDraftLst,
      usersLst: usersLst,
      userType: "admin",
    },
  };
}
