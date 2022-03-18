import React, { Component } from "react";
import "./style.css/01-index.css";

export default class App extends Component {
  render() {
    var name = "peter";
    var num = 30;
    var styleobj = {
      backgroundColor: "yellow",
      // backgroundColor
      fontSize: "30px",
    };
    return (
      <div>
        {10 + 20}+{name}
        {10 > num ? "aaa" : "bbbb"}
        <div style={styleobj}>1111111</div>
        <div className="active">2222222</div>
        <label htmlFor="username">username:</label>
        
        <input type="text" id="username"></input>
      </div>
    );
  }
}
