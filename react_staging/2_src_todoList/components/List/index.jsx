import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import Item from '../Item'
import './index.css'

export default class List extends Component {

    // 对接收的props进行限制；类型，必要性
    static propsTypes = {
        updateTodo: PropsTypes.func.isRequired,
        todos:PropsTypes.array.isRequired
    }

    render() {
        const { todos, updateTodo,deleteTodo } = this.props
        return (
            <div>
                <ul className='todo-main'>
                    {
                        todos.map((todo) => {
                            return <Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
                        })
                    }
                </ul>
            </div>
        )
    }
}
