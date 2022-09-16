import React, { Component } from 'react'
import Search from './components/Search/Search'
import List from './components/List/List'

export default class App extends Component {
  // 初始化状态
  state = {users:[]}

  // 接收并更新users数据
  saveUsers = (users) => {
    this.setState({users:users})
  }

  render() {
    return (
      <div>
        <Search saveUsers={this.saveUsers}/>
        <List users={this.state.users}/>
      </div>
    )
  }
}

