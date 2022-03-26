import React, { Component } from "react";

export default class App extends Component {
    a = 6;
    mytext = React.createRef()
  render() {
    return (
      <div>
        <input ref={this.mytext}></input>
        
        <button
          onClick={() => {
            this.handldClick4()
            // recommended
          }}
        >
          Add4
        </button>
      </div>
    );
  }
  handldClick4 = () => {
    console.log("clicked4",this.mytext.current.value);
  };

//   react中不会真正绑定事件到每一个具体的元素上，而是采用事件代理的模式：
}
