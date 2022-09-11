import { Card, List, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import PlaceDetailCard from "./placeDetailCard/placeDetailCard";

const PlaceListComp = (props) => {
  const { places } = props;
  const [pageSize, setPageSize] = useState(6);
  const [maxIndex, setMaxIndex] = useState(pageSize);
  const [minIndex, setMinIndex] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => { 
    if (pageSize > places.length) {
      setMaxIndex(places.length);
      setMinIndex(0);
    } else {
      setMaxIndex(current * pageSize);
      setMinIndex((current - 1) * pageSize);
    }
   },[pageSize,current,places.length])

  const sizeChangeHandler = (current, size) => {
    setPageSize(size);
    setCurrent(current)
  };
  const handleChange = (page) => {
    setCurrent(page);
    setMaxIndex(page * pageSize);
    setMinIndex((page - 1) * pageSize);
  };

  return (
    <div>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={places}
        renderItem={(item, index) =>
          index >= minIndex &&
          index < maxIndex && (
            <List.Item>
              <PlaceDetailCard placeDetail={item} />
            </List.Item>
          )
        }
      />

      <Pagination
        pageSize={pageSize}
        pageSizeOptions={[3, 6, 9, 12]}
        showSizeChanger={true}
        onShowSizeChange={sizeChangeHandler}
        onChange={handleChange}
        current={current}
        total={places.length}
      />
    </div>
  );
};

export default PlaceListComp;
