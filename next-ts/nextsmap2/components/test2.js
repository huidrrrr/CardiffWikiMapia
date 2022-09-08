import { Card, Image } from "antd";
const { Meta } = Card;
import React from "react";

const App = () => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={
      <Image
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      />
    }
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
);

export default App;
