import React, { Component } from "react";
import axios from "axios";
import BetterScroll from 'better-scroll'
export default class cinema extends Component {
  constructor() {
    super();
    this.state = {
      cinemalsit: [],
      backuplst: [],
    };
    axios({
      url: "https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=8345812",
      method: "get",
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.2.0","e":"1649178181343039037931521"}',
        "X-Host": "mall.film-ticket.cinema.list",
      },
    }).then((res) => {
      this.setState({
        cinemalsit: res.data.data.cinemas,
        backuplst: res.data.data.cinemas,
      });
      
      console.log(res);

      new BetterScroll('.betterwrapper')
    });
  }
  render() {
    return (
      <div>
        <input onInput={this.handleInput} />
        <div
          className="betterwrapper"
          style={{
            height: "500px",
            background: "yellow",
            overflow: "hidden",
          }}
        >
          <div className="content">
            {this.state.cinemalsit.map((item) => (
              <dl key={item.cinemaId}>
                <dt>{item.name}</dt>
                <dd>{item.address}</dd>
              </dl>
            ))}
          </div>
        </div>
      </div>
    );
  }
  handleInput = (event) => {
    console.log(event.target.value);
    var newlst = this.state.backuplst.filter(
      (item) =>
        item.name.toUpperCase().includes(event.target.value.toUpperCase()) ||
        item.address.toUpperCase().includes(event.target.value.toUpperCase())
    );
    this.setState({
      cinemalsit: newlst,
    },);
  };
}
