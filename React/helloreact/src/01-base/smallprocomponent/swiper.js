import React, { Component } from 'react'
import { Button, DatePicker, version, Carousel  } from "antd";
import "antd/dist/antd.css";

export default class swiper extends Component {
    
  render() {
    function onChange(a, b, c) {
        console.log(a, b, c);
      }
      
      const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };
    return (
        <Carousel afterChange={onChange}>
        <div>
          <h3 style={contentStyle}>aaa</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    )
  }
}
