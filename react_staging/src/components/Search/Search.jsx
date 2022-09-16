import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {

    search = () => {
        // 获取用户的输入
        const { value } = this.keyWordElement
        console.log(value)
        // 发送请求
        axios.get(`https://api.github.com/search/users?q=${value}`).then(
            response => {
                {console.log('success',response.data);}
                this.props.saveUsers(response.data.items)
            },
            error => { console.log('fail', error); }
        )
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }} >
                <h3>搜索GitHub用户</h3>
                <input ref={c => this.keyWordElement = c} type="text" placeholder='输入用户名' />&nbsp;&nbsp;&nbsp;
                <button onClick={this.search}>搜索</button>
            </div>
        )
    }
}
