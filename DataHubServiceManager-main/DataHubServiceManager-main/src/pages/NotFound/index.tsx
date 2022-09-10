import React from "react";

const NotFound: React.FC = () => {
  return (
    <>
      <div
        style={{
          color: "#3366CC",
          textAlign: "center",
          fontSize: 100,
          fontWeight: "bold",
          marginTop: 42,
          marginBottom: 42,
          lineHeight: 1.25,
        }}
      >
        404
        <br />
        NOT FOUND
      </div>
    </>
  );
};

export default NotFound;
