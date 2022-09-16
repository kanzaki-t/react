import React, { Component } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import List from './components/List'
import './App.css'

export class App extends Component {
  // 状态在哪里，方法就在哪里


  // 初始化状态
  state = {
    todos: [
      // {id:'001',name:'吃饭',done:true},
      // {id:'002',name:'睡觉',done:true},
      // {id:'003',name:'打代码',done:true},

    ]
  }

  //addtodo用于添加一个todo，接收的参数是todo对象
  addTodo = (todoObj) => {
    // 追加一个todo
    const newTodos = [todoObj, ...this.state.todos]
    // 更新状态
    this.setState({ todos: newTodos })
  }

  //updateTodo用于更新一个todo对象，修改勾选状态，接收的参数是id，done
  updateTodo = (id, done) => {
    // 获取状态中的todos
    const { todos } = this.state
    // 匹配处理数据
    const newTodos = todos.map((todoObj) => {
      if (todoObj.id === id) {
        return { ...todoObj, done: done }
      } else {
        return todoObj
      }
    })
    // 更新状态
    this.setState({ todos: newTodos })
  }

  //deleteTodo用于更新一个todo对象
  deleteTodo = (id) => {
    // 获取状态中的todos
    const { todos } = this.state
    // 删除指定id的todo对象
    const newTodos = todos.filter((todoObj) => {
      return todoObj.id !== id
    })
    // 更新状态
    this.setState({ todos: newTodos })
  }

  // 用于全选
  checkAlltodos = (done) => {
    // 获取状态中的todos
    const { todos } = this.state
    // 加工
    const newTodos = todos.map((todoObj) => {
      return {...todoObj,done:done}
    })
    // 更新状态
    this.setState({ todos: newTodos })
  }

  // 用于删除所有已完成
  clearAllDone = () => {
    // 获取状态中的todos
    const { todos } = this.state
    // 过滤数据
    const newTodos = todos.filter((todoObj) => {
      return todoObj.done === false
    })
    // 更新状态
    this.setState({ todos: newTodos })
  }

  render() {
    return (
      <div className='todo-container'>
        <div className='todo-wrap'>
          <Header addTodo={this.addTodo} />
          <List todos={this.state.todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
          <Footer todos={this.state.todos} checkAlltodos={this.checkAlltodos} clearAllDone={this.clearAllDone}/>

        </div>
      </div>
    )
  }
}

export default App
