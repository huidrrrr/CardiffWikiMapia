import React, { Component } from "react";


export default class App extends Component {
  mytext = React.createRef();
  state = {
    list: [
      {
        id: 1,
        content: "aa",
      },
      {
        id: 2,
        content: "bb",
      },
      {
        id: 3,
        content: "cc",
      },
    ],
  };

  render() {
    return (
      <div>
        <input ref={this.mytext}></input>

        <button
          onClick={() => {
            this.handldClick4();
            // recommended
          }}
        >
          Add4
        </button>
        <ul>
          {this.state.list.map((item,index) => (
            
            <li key={item.id}>
              <span dangerouslySetInnerHTML={{
                __html:item.content
              }}></span>
              {/* {item.content} */}
            <button onClick={()=>this.handleDelClick(index)}>del</button>
            </li>

          ))}
        </ul>
        {/* {this.state.list.length===0?<div>nothing to be done</div>:null} */}
        {this.state.list.length===0 && <div>nothing to be done</div>}
      </div>
    );
  }










  handldClick4 = () => {
    console.log("clicked4", this.mytext.current.value);
    // this.state.list.push(this.mytext.current.value)
    // this.setState({
    //     list:this.state.list
    // })
    var newlist = [...this.state.list];
    newlist.push({
      id: Math.random() * 10000,
      content: this.mytext.current.value,
    });
    this.setState({
      list: newlist,
    });
    // clear input
    this.mytext.current.value=''
  };
  handleDelClick(index){
    // 复制数组
      let newlst = this.state.list.concat()
    //   let newlst = this.state.list.slice()
    newlst.splice(index,1)
    this.setState({
        list:newlst
    })
  }

  //   react中不会真正绑定事件到每一个具体的元素上，而是采用事件代理的模式：
}
