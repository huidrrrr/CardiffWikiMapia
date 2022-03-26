import React, { Component } from 'react'

export default class App extends Component {
    state={
        list:['aa','bb','cc']
    }
  render() {
    var newlist=this.state.list.map(item=><li key={item}>{item}</li>)
    return (
      <div>
          <ul>
            {
               newlist
            }
          </ul>
      </div>
    )
  }
}


// 原生js map

// var list=['aa','bb','cc']

// var newlist=list.map(item=>`<li>${item}</li>`)


// console.log(newlist.join(""));