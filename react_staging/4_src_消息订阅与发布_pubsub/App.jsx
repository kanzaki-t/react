import React, { Component } from 'react'
import Search from './components/Search/Search'
import List from './components/List/List'

export default class App extends Component {


  render() {
    return (
      <div>
        <Search updateAppState={this.updateAppState} />
        <List {...this.state} />
      </div>
    )
  }
}

