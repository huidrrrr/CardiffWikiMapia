import { Button } from "antd";
import React, { Component } from "react";

export default class App extends Component {
  state = {
    count: 1,
  };
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.handleAdd}>add 1</Button>
        <button onClick={this.handleAdd2}>add 1</button>
        <p>{this.state.count}</p>
      </div>
    );
  }
  handleAdd = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  handleAdd2 = () => {
    setTimeout(() => {
      this.setState({
        count: this.state.count + 1,
      },()=>{
          console.log(this.state.count);
      });
      this.setState({
        count: this.state.count + 1,
      },()=>{
          console.log(this.state.count);
      });
      this.setState({
        count: this.state.count + 1,
      });
    }, 0);
  };
}

// setState处在同步的逻辑中，异步更新状态，更新真实dom
// setState 处在异步的逻辑中，同步的更新状态，同步更新真实dom
// setState 接收第二个参数，第二个参数是回调函数，状态和dom更新完后会就会被触发