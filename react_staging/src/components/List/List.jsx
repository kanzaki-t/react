import React, { Component } from 'react'

export default class List extends Component {
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                {
                    this.props.users.map((userObj) => {
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
