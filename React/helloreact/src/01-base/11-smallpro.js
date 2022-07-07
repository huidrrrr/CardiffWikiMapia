import React, { Component } from "react";
import "./style/smallprostyle.css";
import Film from "./smallprocomponent/Film";
import Center from "./smallprocomponent/Center";
import Cinema from "./smallprocomponent/Cinema";

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
      },{}
    ],
    current: 0,
  };

  which(value) {
    switch (value) {
      case 0:
        return <Film></Film>;
      case 1:
        return <Cinema></Cinema>;
      case 2:
        return <Center></Center>;

      default:
        return null
    }
  }
  render() {
    return (
      <div>
        {/* {this.state.current === 0 && <Film></Film>}
        {this.state.current === 1 && <Cinema></Cinema>}
        {this.state.current === 2 && <Center></Center>} */}
        {
          this.which(this.state.current)
        }

        <ul>
          {this.state.list.map((item, index) => (
            <li
              className={this.state.current === index ? "active" : ""}
              onClick={() => this.handleclick(index)}
              key={item.id}
            >
              {item.content}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  handleclick(index) {
    this.setState({
      current: index,
    });
  }
  
}
