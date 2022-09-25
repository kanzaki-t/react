import React, { Component } from 'react'
import './List.css'
import PubSub from 'pubsub-js'

export default class List extends Component {

    state = { //初始化状态
		users:[], //users初始值为数组
		isFirst:true, //是否为第一次打开页面
		isLoading:false,//标识是否处于加载中
		err:'',//存储请求相关的错误信息
	} 

    componentDidMount(){
		this.token = PubSub.subscribe('atguigu',(_,stateObj)=>{
			this.setState(stateObj)
		})
	}

	componentWillUnmount(){
		PubSub.unsubscribe(this.token)
	}

    render() {
        const {users,isFirst,isLoading,err} = this.props
        return (
            <div style={{ textAlign: 'center' }}>
                {
                    isFirst ? <h2>欢迎使用，输入关键字，随后点击搜索</h2> :
					isLoading ? <div class="loader"><div class="pacman"><div></div><div></div><div></div><div></div><div></div></div></div> :
					err ? <h2 style={{color:'red'}}>{err}</h2> :
                    users.map((userObj) => {
                        return(
                            <div key={userObj.id}>
                                <img src={userObj.avatar_url} alt="fail" style={{width:'100px'}} /><br />
                                name:{userObj.login}<br />
                                address:{userObj.html_url}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
