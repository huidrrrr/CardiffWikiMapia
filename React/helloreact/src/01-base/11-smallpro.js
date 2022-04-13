import React, { Component } from "react";
import "./style.css/smallprostyle.css";

export default class App extends Component {
  state = {
    list: [
      {
        id: 1,
        content: "movies",
      },
      {
        id: 2,
        content: "cinema",
      },
      {
        id: 3,
        content: "mine",
      },
    ],
    current: 0,
  };
  render() {
    return (
      <div>
        <ul>
          {this.state.list.map((item, index) => (
            <li
              className={this.state.current === index ? "active" : ""}
              onClick={()=>this.handleclick(index)}
              key={item.id}
            >
              {item.content}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  handleclick(index){
    this.setState({
        current:index
    })
  }
}
