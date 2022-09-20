import { Table, Badge, Popconfirm, message } from "antd";
import React, { useState } from "react";
import {
  updatePlaceInfoById,
  updatePlaceDraftById,
  getAllPlaceDraftById,
  getAllDraftPlace,
} from "../helper/apiUtil";
import moment from "moment";

const columnsInside = [
  {
    title: "Event name",
    dataIndex: "eventName",
    key: "eventName",
    width: "20%",
  },
  {
    title: "Event subtitle",
    dataIndex: "eventSubtitle",
    key: "eventSubtitle",
    width: "10%",
  },
  {
    title: "upload date",
    dataIndex: "eventDateInMomentFormat",
    key: "eventDateInMomentFormat",
  },
  {
    title: "Event content",
    dataIndex: "eventContent",
    key: "eventContent",
    width: "50%",
  },
];
const dataConvertor = (eventsLst) => {
  const resStrucEventLst = eventsLst.map((eventsDraft) => {
    return {
      key: eventsDraft.id,
      editedTime: eventsDraft.editedTime,
      editedTimeInMomentFormat: moment(eventsDraft.editedTime).format(
        "MMMM Do YYYY, h:mm:ss a"
      ),
      editorId: eventsDraft.editorId,
      state:
        eventsDraft.state === "auditing" ? (
          <span>
            <Badge status="processing" />
            processing
          </span>
        ) : eventsDraft.state === "rejected" ? (
          <span>
            <Badge status="error" />
            Rejected
          </span>
        ) : (
          <span>
            <Badge status="default" />
            Audited
          </span>
        ),

        eventId: eventsDraft.eventId,
        eventName: eventsDraft.event.name,
        eventDate: eventsDraft.event.date,
        eventDateInMomentFormat: moment(eventsDraft.event.date).format(
        "MMMM Do YYYY, h:mm:ss a"
      ),
      eventSubtitle: eventsDraft.event.subtitle,
      eventContent: eventsDraft.event.content,
      auditState: eventsDraft.state,
    };
  });
  return resStrucEventLst;
};

const PlaceTable = (props) => {
  const { eventDraftLst } = props;
  const initialData = dataConvertor(eventDraftLst);
  const [data, setData] = useState(initialData);

  const auditChange = (record) => {
    updatePlaceInfoById(record.placeId, {
      name: record.placeName,
      date: record.placeDate,
      description: record.placeDescription,
      category: record.placeCategory,
    }).then((res) => {
      if (res.status === 200) {
        updatePlaceDraftById(record.key, { state: "audited" }).then((res) => {
          if (res.status === 200) {
            getAllDraftPlace().then((res) => {
              setData(dataConvertor(res));
              message.info("audit successfully");
            });
          }
        });
      } else {
        message.warn("audit failed");
      }
    });
  };
  const rejectChange = (record) => {
    updatePlaceDraftById(record.key, { state: "rejected" }).then((res) => {
      if (res.status === 200) {
        getAllDraftPlace().then((res) => {
          setData(dataConvertor(res));
          message.info("rejected successfully");
        });
      }
    });
  };
  const columns = [
    {
      title: "Draft id",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Event id",
      dataIndex: "eventId",
      key: "eventId",
    },
    {
      title: "Editor id",
      dataIndex: "editorId",
      key: "editorId",
    },
    {
      title: "edit time",
      dataIndex: "editedTimeInMomentFormat",
      key: "editedTimeInMomentFormat",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => {
        if (record.auditState === "auditing") {
          return (
            <>
              <Popconfirm
                title="Sure to audit?"
                onConfirm={() => {
                  auditChange(record);
                }}
              >
                <a style={{ color: "blue", marginRight: "2rem" }}>audit</a>
              </Popconfirm>
              <Popconfirm
                title="Sure to reject?"
                onConfirm={() => {
                  rejectChange(record);
                }}
              >
                <a style={{ color: "red" }}>reject</a>
              </Popconfirm>
            </>
          );
        } else if (record.auditState === "audited") {
          return <></>;
        } else if (record.auditState === "rejected") {
          return (
            <>
              <Popconfirm
                title="Sure to audit?"
                onConfirm={() => {
                  auditChange(record);
                }}
              >
                <a style={{ color: "blue", marginRight: "2rem" }}>audit</a>
              </Popconfirm>
            </>
          );
        }
      },
    },
  ];

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => {
          return (
            <Table
              columns={columnsInside}
              dataSource={[record]}
              pagination={false}
            />
          );
        },
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={data}
    />
  );
};

export default PlaceTable;
