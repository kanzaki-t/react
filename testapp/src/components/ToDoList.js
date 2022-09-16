import React, { useState } from 'react';

const ToDoList = () => {

    const list = [];

    const [todolist, setTodolist] = useState(list);

    const [task, setTask] = useState('');

    const handleNewTask = (event) => {
        setTask( event.target.value )
    }

    // add
    const onClickAdd = () => {
        if (task === "") {
            return // 空の場合、addしない
        }

        const newtask = {
            id:new Date() + Math.random(),
            title:task
        }
        // 入力した物の表現式

        const newlist = [...todolist];　// 現在のlistを展開

        newlist.push(newtask); // 入力した物を展開したlistに入れる

        setTodolist(newlist); //todolistを更新する

        setTask(''); // input欄を空にする
    }

    // delete
    const onClickDelete = (index) => {
        const deletedTodoList = [...todolist];

        deletedTodoList.splice(index, 1);

        setTodolist(deletedTodoList);
    }

    return (

        <div>
            <h1>ToDo List</h1>

            Add Task:<input placeholder="Add New Task" value={task} onChange={handleNewTask} />

            <button onClick={onClickAdd}>Add</button>

            <ul>
                {
                    todolist.map((item, index) =>(
                        <li key={item.id}>
                            {item.title}
                            <button onClick={() =>onClickDelete(index)}>delete</button>
                        </li>
                    )
                    )
                }
            </ul>

            {todolist.length === 0 && <div style={{color: 'red'}}>you don't have any tasks</div>}

            {/* {todolist.length === 0 ? <div>you don't have any tasks</div> : null} */}

        </div>




    );

}



export default ToDoList;