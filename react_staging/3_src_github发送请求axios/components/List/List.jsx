import React, { Component } from 'react'
import './List.css'

export default class List extends Component {
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
