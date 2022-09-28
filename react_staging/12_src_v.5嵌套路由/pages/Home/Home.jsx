import React, { Component } from 'react'
import News from './News/News'
import Message from './Message/Message'
import { Route, Switch, Redirect } from 'react-router-dom' //react-router是版本5
import MyNavLink from '../../components/MyNavLink/MyNavLink'

export default class Home extends Component {
  render() {
    return (
      <div>
        <h3>我是Home页面</h3>

        <div>
          <ul className="nav nav-tabs">
            <li>
              <MyNavLink to="/home/news" >News</MyNavLink>
          </li>
          <li>
            <MyNavLink to="/home/message" >Message</MyNavLink>
          </li>
        </ul>
        {/* 注册路由 */}
        <Switch>
          <Route path="/home/news" component={News} />
          <Route path="/home/message" component={Message} />
          <Redirect to="/home/news" />
        </Switch>

      </div>
      </div >
    )
  }
}
