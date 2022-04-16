import React, { Component } from "react";
import BetterScroll from '@better-scroll/core'


export default class App extends Component {
  state = {
    list: [],
  };
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.getDate();
          }}
        >
          click
        </button>
        <div
          className="peterwrapper"
          style={{
            height: "200px",
            background: "yellow",
            overflow: "hidden",
          }}
        >
          <ul className="petercontent">
            {this.state.list.map((item) => 
              <li key={item}>{item}</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
  getDate = () => {
    var lst = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 22, 33, 44, 55];
    this.setState(
      {
        list: lst,
      },
      () => {
          console.log(this.state.list);
          console.log(document.querySelectorAll('li'));
        new BetterScroll(".peterwrapper");
      }
    );
  };
}
