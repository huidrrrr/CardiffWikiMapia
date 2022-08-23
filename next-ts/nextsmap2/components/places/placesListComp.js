import { Card, List } from 'antd';
import React from 'react';
import PlaceDetailCard from './placeDetailCard/placeDetailCard';


const PlaceListComp = (props) => {
    const {places} = props

   
    return (<List
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
        renderItem={(item) => (
          <List.Item>
            <PlaceDetailCard placeDetail={item}/>
          </List.Item>
        )}
      />)
};

export default PlaceListComp;