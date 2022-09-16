import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import {nanoid} from 'nanoid'// nanoid用来生成一个唯一的id
import './index.css'

export default class Header extends Component {
  // 对接收的props进行限制；类型，必要性
  static propsTypes = {
    addTodo:PropsTypes.func.isRequired
  }

  handleKeyup = (e) => {
    // 判断是否是回车按键
    if (e.keyCode !== 13) {
      return
    }
    // 添加的todo名字不能为空
    if (e.target.value.trim() === '') {
      alert('输入不能为空')
      return
    }
    // 准备好一个todo对象
    const todoObj = {id:nanoid(),name:e.target.value,done:false}
    //将todoobj传递给App
    this.props.addTodo(todoObj)
    // 清空
    e.target.value = '';
  }
  render() {
    return (
      <div className='todo-header'>
        <input onKeyUp={this.handleKeyup} type="text" placeholder='请输入你的任务名称，按回车键确认' />
      </div>
    )
  }
}
