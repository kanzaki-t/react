import React from 'react'
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import Login from '../vierws/login/Login'
import NewsSandBox from '../vierws/sandbox/NewsSandBox'

export default function IndexRouter() {
    return (

        <BrowserRouter>
            <Routes>
                {/* <Route path='/login' element={<Login />} /> */}
                {/* <Route path='/' element={localStorage.getItem("token")?<NewsSandBox />:<Login />} /> */}
                {/* 
                由于未授权的情况下需要让页面自动跳转到login页面.
                普通写法:
                <Route path='*' element={<NewsSandBox />} />
                */}
                <Route path='*' element={<NewsSandBox />} />
            </Routes>
        </BrowserRouter>

    )
}
