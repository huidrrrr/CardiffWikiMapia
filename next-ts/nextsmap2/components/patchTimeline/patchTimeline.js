import { Button, Timeline } from 'antd';
import React, { useState } from 'react';
import moment from 'moment'
const App = (props) => {
    const {patchs} = props
  return (
    <div style={{maxWidth:'40rem',minWidth:'20rem',boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",backgroundColor:'white',padding:'1rem',marginTop:'1rem'}}>
      <Timeline pending="Coming news" mode='left' reverse>
        {patchs.map((patch) => <Timeline.Item key={patch.id} label={moment(patch.date).format("MMMM Do YYYY")}>{patch.name}</Timeline.Item>)}
      </Timeline>
    </div>
  );
};
export default App;