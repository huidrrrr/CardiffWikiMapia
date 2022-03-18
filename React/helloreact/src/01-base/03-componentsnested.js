import React, { Component } from "react";


class Child extends Component{
  render(){
    return (
      <div>
        Child

      </div>
    )
  }
}

class Navbar extends Component {
  render() {
    return <div>navigator
      <Child></Child>

    </div>;
  }
}

function Swiperbar() {
  return <div>Swiperbar</div>;
}

const Tabbar = () => <div>Tabbar</div>;

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Swiperbar></Swiperbar>
        <Tabbar></Tabbar>
      </div>
    );
  }
}
