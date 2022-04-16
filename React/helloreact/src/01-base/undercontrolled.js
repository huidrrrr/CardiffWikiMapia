import React, { Component } from "react";
// import Btn from "./smallprocomponent/btn_antd";
import { Button } from 'antd';

export default class App extends Component {
  mytext = React.createRef();
  state = {
    text: "",
    list: [
      {
        id: 1,
        content: "aa",
        ischecked: false,
      },
      {
        id: 2,
        content: "bb",
        ischecked: false,
      },
      {
        id: 3,
        content: "cc",
        ischecked: false,
      },
    ],
  };

  render() {
    return (
      <div>
        <input
          value={this.state.text}
          onChange={(evt) => {
            this.setState({
              text: evt.target.value,
            });
          }}
        ></input>

        <button
          onClick={() => {
            this.handldClick4();
            // recommended
          }}
        >
          Add4
        </button>
        <ul>
          {this.state.list.map((item, index) => (
            <li key={item.id}>
              <span
                dangerouslySetInnerHTML={{
                  __html: item.content,
                }}
                style={{textDecoration: item.ischecked?'line-through':''}}
              ></span>
              {/* {item.content} */}
              <Button type="primary">nmsl</Button>
              <input type='checkbox' checked={item.ischecked} onChange={()=>this.handleChecked(index)}></input>
              <button onClick={() => this.handleDelClick(index)}>del</button>
            </li>
          ))}
        </ul>
        {/* {this.state.list.length===0?<div>nothing to be done</div>:null} */}
        {this.state.list.length === 0 && <div>nothing to be done</div>}
      </div>
    );
  }

  handleChecked=(index)=>{
    console.log(index);
    var newlist = [...this.state.list];
    newlist[index].ischecked=!newlist[index].ischecked
    this.setState({
      list:newlist
    })

  }

  handldClick4 = () => {
    // console.log("clicked4", this.mytext.current.value);
    // this.state.list.push(this.mytext.current.value)
    // this.setState({
    //     list:this.state.list
    // })
    var newlist = [...this.state.list];
    newlist.push({
      id: Math.random() * 10000,
      content: this.state.text,
    });
    this.setState({
      list: newlist,
      text: "",
    });
    // clear input
  };
  handleDelClick(index) {
    // 复制数组
    let newlst = this.state.list.concat();
    //   let newlst = this.state.list.slice()
    newlst.splice(index, 1);
    this.setState({
      list: newlst,
    });
  }

  //   react中不会真正绑定事件到每一个具体的元素上，而是采用事件代理的模式：
}
