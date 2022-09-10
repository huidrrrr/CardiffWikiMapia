import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <div style={{ textAlign: "center", paddingTop: 46 }}>
        <h1
          style={{
            fontSize: 78,
            fontWeight: "bolder",
            margin: "0 auto",
            padding: 0,
            lineHeight: 1.25,
            color: "#3366CC",
          }}
        >
          DataHub
          <br></br>
          ServiceManager
        </h1>

        <br></br>

        <h2 style={{color: "gray"}}>An customize DataHub Service Manager for Iot data transmission.</h2>
        <h2 style={{color: "lightcoral"}}>ALPHA TESTING</h2>
      </div>
    </>
  );
};

export default Home;
