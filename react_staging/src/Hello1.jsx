import React, { Component } from 'react'

export default class Hello extends Component {
  state={
    arr:[]
  }
  handelChange = e => {
    const value = e.target.value
    let newArr = [...this.state.arr]
    if (newArr.includes(value)) {
      newArr=newArr.filter(x=>x !== value)
    }else {
      newArr.push(value)
    }
    this.setState({
      arr:newArr
    })
  }
  render() {
    return (
      <table border="2"style={{background:this.state.arr.includes("饮料")?'red':''}}>
        <tr >
          <td rowspan="3"><input type="checkbox" value="饮料" onChange={this.handelChange.bind(this)}></input>饮料</td>
          <td style={{background:this.state.arr.includes("带气的")?'blue':''}}><input type="checkbox" value="带气的" onChange={this.handelChange.bind(this)}></input>带气的</td>
          <td style={{background:this.state.arr.includes("带气的")?'blue':''}}>可乐</td>
        </tr>
        <td style={{background:this.state.arr.includes("不带气的")?'blue':''}}><input type="checkbox" value="不带气的" onChange={this.handelChange.bind(this)}></input>不带气的</td>
        <td style={{background:this.state.arr.includes("不带气的")?'blue':''}}>果汁</td>
      </table>
    )
  }
}
