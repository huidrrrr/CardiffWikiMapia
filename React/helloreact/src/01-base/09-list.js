import React, { Component } from 'react'

export default class App extends Component {
    state={
      list:[{
        id:1,
        content:"aa",
      },
      {
        id:2,
        content:"bb",
      },
      {
        id:3,
        content:"cc",
      }]
    }
  render() {
    return (
      <div>
          <ul>
            {
               this.state.list.map((item,index)=>
                <li key={item.key}> {item.content}</li>)
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