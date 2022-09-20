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
    title: "Place name",
    dataIndex: "placeName",
    key: "placeName",
    width: "20%",
  },
  {
    title: "Place category",
    dataIndex: "placeCategory",
    key: "placeCategory",
    width: "10%",
  },
  {
    title: "upload date",
    dataIndex: "placeDateInMomentFormat",
    key: "placeDateInMomentFormat",
  },
  {
    title: "Place description",
    dataIndex: "placeDescription",
    key: "placeDescription",
    width: "50%",
  },
];
const dataConvertor = (placeLst) => {
  const reStrucPlaceDraftData = placeLst.map((placeDraft) => {
    return {
      key: placeDraft.id,
      editedTime: placeDraft.editedTime,
      editedTimeInMomentFormat: moment(placeDraft.editedTime).format(
        "MMMM Do YYYY, h:mm:ss a"
      ),
      editorId: placeDraft.editorId,
      state:
        placeDraft.state === "auditing" ? (
          <span>
            <Badge status="processing" />
            processing
          </span>
        ) : placeDraft.state === "rejected" ? (
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

      placeDate: placeDraft.place.date,
      placeId: placeDraft.place.placeId,
      placeCategory: placeDraft.place.category,
      placeDateInMomentFormat: moment(placeDraft.place.date).format(
        "MMMM Do YYYY, h:mm:ss a"
      ),
      placeName: placeDraft.place.name,
      placeDescription: placeDraft.place.description,
      auditState: placeDraft.state,
    };
  });
  return reStrucPlaceDraftData;
};

const PlaceTable = (props) => {
  const { placeDraftLst } = props;
  const initialData = dataConvertor(placeDraftLst);
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
      title: "Place id",
      dataIndex: "placeId",
      key: "placeId",
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
