import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import { Layout, Menu } from 'antd';
import {
  DesktopOutlined, UserOutlined
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';

const { Sider } = Layout

// 例えばapiからもらったユーザーメニュー
// const userMenuList = [
//   {
//     key:"/",
//     title:"ホームページ",
//     icon:<DesktopOutlined />
//   },
//   {
//     key:"/user-manage",
//     title:"ユーザー管理",
//     icon:<DesktopOutlined />,
//     children:[
//       {
//         key:"/user-manage/list",
//         title:"ユーザーリスト",
//         icon:<DesktopOutlined />
//       }
//     ]
//   },
//   {
//     key:"/right-manage",
//     title:"制限管理",
//     icon:<DesktopOutlined />,
//     children:[
//       {
//         key:"/right-manage/role/list",
//         title:"管理者リスト",
//         icon:<DesktopOutlined />
//       },
//       {
//         key:"/right-manage/right/list",
//         title:"制限リスト",
//         icon:<DesktopOutlined />
//       }
//     ]
//   }

// ]
const iconList = {
  "/": <DesktopOutlined />,
  "/user-manage": <UserOutlined />,
  "/user-manage/list": <UserOutlined />,
  "/right-manage": <UserOutlined />,
  "/right-manage/role/list": <UserOutlined />,
  "/right-manage/right/list": <UserOutlined />
  //.......
}

export default function SideMenu() {
  const [menu, setMenu] = useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
      console.log('sideMenu:', res.data);
      setMenu(res.data)
    })
  }, [])

  //const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()

  const checkPermission = (item) => {
    return item.pagepermisson === 1
  }

  const renderMenus = (menu) => {

    return menu.map(item => {
      if (item.children?.length > 0 && checkPermission(item)) {
        return <SubMenu key={item.key} title={item.title} icon={iconList[item.key]} >
          {renderMenus(item.children)}
        </SubMenu>
      }

      return checkPermission(item) && <Menu.Item key={item.key} icon={iconList[item.key]} onClick={() => {
        navigate(item.key)
      }}>
        {item.title}
      </Menu.Item>
    })
  }

  console.log('location.pathname:',location.pathname);
  const selectKeys = location.pathname
  const openKeys = ['/'+location.pathname.split('/')[1]]
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{ display: 'flex', height: '100%', 'flexDirection': 'column' }}>
        <div className="logo" >KANZAKI SYSTEM</div>
        <div style={{flex:1,'overflow':'auto'}}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectKeys}
            defaultOpenKeys={openKeys}
          >
            {renderMenus(menu)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
