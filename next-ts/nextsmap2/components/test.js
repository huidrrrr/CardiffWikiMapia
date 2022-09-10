import { Anchor, Form, Input } from "antd";
import React from "react";
import moment from "moment";
const { Link } = Anchor;

const App = () => {
  const lst = [
    { id: "1", date: "1/09/2022, 16:14:39", label: "latest" },
    { id: "3", date: "8/09/2022, 07:14:39", label: "earliest" },
    { id: "2", date: "9/10/2022, 16:14:39", label: "middle" },
    { id: "4", date: "4/09/2022, 16:14:39", label: "middle" },
    { id: "5", date: "9/09/2022, 05:14:39", label: "middle" },
    { id: "9", date: "9/09/2022, 20:14:39", label: "middle" },
  ];
  lst.forEach((ele) => { 
    ele.date=new Date(ele.date)
   })
   


  const sortedActivities = lst.sort((a, b) => b.date - a.date);
  return (
    <div>
      {sortedActivities.map((ele) => (
        <li key={ele.id}>
          {ele.date.toUTCString()}
          <span style={{color:'red'}}>{moment(ele.date.getTime()).fromNow()}</span>
          
        </li>
      ))}
    </div>
  );
};

export default App;
