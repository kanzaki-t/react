import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './tabpage.css';
import Uncreat from './Uncreat';
import Search from './Search';
import Mypage from './Mypage'

const TabPage = () => {
    const navigate = useNavigate();

    // nav
    const ini = {
        list: [
            {
                id: 1,
                text: '未定義'
            },
            {
                id: 2,
                text: '検索'
            },
            {
                id: 3,
                text: 'mypage'
            },
        ],
        current:0
    }

    const [nav, setNav] = useState(ini);
    const handleNav = (index) => {

        setNav((prevState) => ({ ...prevState, current: index }))
    }

    return (
        <div>
            <div>
                <button className='back-button' onClick={() => navigate('/managementpage')}>
                    戻る
                </button>
            </div>

            <div>
                {nav.current === 0 && <Uncreat />}
                {nav.current === 1 && <Search />}
                {nav.current === 2 && <Mypage />}

            </div>

            <div className='tapUl'>
                <ul>
                    {
                        nav.list.map((item, index) =>
                            <li key={item.id} className={nav.current === index ? 'active' : ''} onClick={() => handleNav(index)} >{item.text}</li>
                        )
                    }
                </ul>
            </div>


        </div>
    )


}


export default TabPage