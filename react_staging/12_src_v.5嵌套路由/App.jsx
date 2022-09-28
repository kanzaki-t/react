import React, { Component } from 'react'
import { Route, Switch,Redirect} from 'react-router-dom' //react-router是版本5
import About from './pages/About/About'
import Home from './pages/Home/Home'
import MyNavLink from './components/MyNavLink/MyNavLink'


export default class App extends Component {


  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header"><h2>React Router Demo</h2></div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">

              {/* 原生html中，靠<a>跳转不同的页面 */}
              {/* <a className="list-group-item" href="./about.html">About</a>
							<a className="list-group-item active" href="./home.html">Home</a> */}

              {/* 在React中靠 路由链接 实现切换组件--编写路由链接
                  标签体实际在this.props里以children:""的形式传递，所以MyNavLink组件{...this.props}可以收到 */}
              <MyNavLink to="/about" >About</MyNavLink><br />
              <MyNavLink to="/home" >Home</MyNavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 注册路由 Switch可以提高路由匹配效率(单一匹配)。 */}
                <Switch>
                  <Route  path="/about" component={About} />
                  <Route  path="/home" component={Home} />
                  <Redirect to="/about" />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

