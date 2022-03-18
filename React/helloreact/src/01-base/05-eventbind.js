import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <div>
        <input></input>
        <button
          onClick={() => {
            console.log("clicked");
          }}
        >
          Add1
        </button>

        <button onClick={this.handldClick}>Add2</button>
        <button onClick={this.handldClick3}>Add3</button>
        <button
          onClick={() => {
            this.handldClick4();
            // recommended
          }}
        >
          Add4
        </button>
      </div>
    );
  }

  handldClick() {
    console.log("clicked2");
  }
  handldClick3 = () => {
    console.log("clicked3");
  };
  handldClick4 = () => {
    console.log("clicked4");
  };
}
