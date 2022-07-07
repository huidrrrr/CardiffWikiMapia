import React, { Component } from "react";
import Todo from "../components/Todo";
import Modal from "../components/Modal";
import BackDrop from "../components/BackDrop";

export default class App extends Component {
  render() {
    return (
      <div>
        <Todo text="Hello React" />
        <Todo text="Master React" />
        <Todo text="Explore React" />
        <Modal />
        <BackDrop />
      </div>
    );
  }
}
