import React from 'react'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import { Route, Routes } from 'react-router-dom'
import Home from './home/Home'
import UserList from './user-mange/UserList'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import Nopromission from './nopromission/Nopromission'
import './NewsSandBox.css'
import { Layout } from 'antd'
const { Content } = Layout;



export default function NewsSandBox() {
    return (
        <Layout>

            <SideMenu />

            <Layout className="site-layout">
                
                <TopHeader />

                <Content className="site-layout-background" style={{margin: '24px 16px',padding: 24,minHeight: 280,}}>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/user-manage/list" element={<UserList />} />
                        <Route path="/right-manage/role/list" element={<RoleList />} />
                        <Route path="/right-manage/right/list" element={<RightList />} />

                        <Route path="*" element={<Nopromission />} />
                    </Routes>

                </Content>

            </Layout>

        </Layout >
    )
}
