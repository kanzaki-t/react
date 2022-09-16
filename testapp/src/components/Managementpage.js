import './Managementpage.css';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import ToDoList from './ToDoList'


const Managementpage = () => {
    const navigate = useNavigate();

    const [state, setState] = useState(true);

    const toggle = () => {
        setState(prevState => !prevState)
        console.log(state)
    }


    return (
        <div>
            <div>
                <button className='back-button' onClick={() => navigate('/')}>
                    戻る
                </button>
            </div>

            <div>
                <button onClick={toggle}>
                    {state ? "いいね" : "キャンセル"}
                </button>
            </div>

            <div className='heart2'>
                <h1 style={{ color: state ? '#00F' : '#E0548E' }}>
                    ♥
                    {state ? "お願い致します。" : "ありがとうヽ(^o^)丿"}
                </h1>
            </div>

            <div><ToDoList /></div>

            <div>
                <button className='back-button' onClick={() => navigate('/tabpage')}>
                    tabpage
                </button>
            </div>

        </div>
    );
}


export default Managementpage;