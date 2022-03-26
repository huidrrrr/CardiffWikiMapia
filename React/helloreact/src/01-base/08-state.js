import React, { Component } from "react";

export default class App extends Component {
    constructor(){
        super()
        this.state={
            mytext:'sub',
            mystate:true,
            myname:'peter'
        }

    }


    // state = {
    //     text:"subs",
    //     mystate:true
    // }
    render() {

    return (
      <div>
        <div>welcome react--{this.state.mystate?'peter':'bob'}</div>
        <button onClick={()=>{
            this.setState({
                mystate:!this.state.mystate,
                
            })
            //todo
        }} >{this.state.mystate?'sub':'unsubs'}</button>
      </div>
    );
  }
}
