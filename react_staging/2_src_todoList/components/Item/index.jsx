import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {
  
  // 标识鼠标的移入，移出
  state = {mouse:false}
  // 鼠标的移入，移出的回调
  handleMouse = (flag) => {
    return () => {
      this.setState({mouse:flag})
    }
  }

  // 勾选，取消勾选的回调
  handleCheck = (id) => {
    return (e) => {
      this.props.updateTodo(id,e.target.checked)
    }
  }

  // 删除todo的回调
  handleDelete = (id) => {
    if (window.confirm('确定删除吗？')) {
      this.props.deleteTodo(id)
    }
    
  }

  render() {
    const {id,name,done} = this. props
    return (
      <div>
        <li style={{backgroundColor:this.state.mouse?'#ddd':'white'}}onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
            <label>
                <input type="checkbox" checked={done} onChange={this.handleCheck(id)}/>
                <span>{name}</span>
            </label>
            <button onClick={() => {this.handleDelete(id)}} className='btn btn-danger' style={{display:this.state.mouse?'block':'none'}}>削除</button>
        </li>
      </div>
    )
  }
}
