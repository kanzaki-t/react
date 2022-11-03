import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import { Table, Tag, Button, Modal, message, Popover, Switch, } from 'antd'
import {
  DeleteOutlined, EditOutlined, ExclamationCircleOutlined
} from '@ant-design/icons'
import UserForm from '../../../components/user-manage/UserForm'
const { confirm } = Modal

export default function UserList() {

  const [dataSource, setdataSource] = useState([])
  const [isOpen, setisOpen] = useState(false)
  const [roleList, setroleList] = useState([])
  const [regionList, setregionList] = useState([])
  const addForm = useRef(null)

  useEffect(() => {
    axios.get("http://localhost:5000/users?_expand=role").then(res => {
      console.log('setdataSource:', res.data);
      const list = res.data
      setdataSource(list)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/regions").then(res => {
      console.log('setdataSource:', res.data);
      const list = res.data
      setregionList(list)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/roles").then(res => {
      console.log('setdataSource:', res.data);
      const list = res.data
      setroleList(list)
    })
  }, [])

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: (region) => {
        return <b>{region === '' ? '全球' : region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        return <Tag color="blue">{role.roleName}</Tag>
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
      render: (username) => {
        return <Tag color="purple">{username}</Tag>
      }
    },
    {
      title: '用户名状态',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return <Switch checked={roleState} disabled={item.default}></Switch>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div>
            <Button danger type="primary" shape="circle" icon={<DeleteOutlined />} disabled={item.default} onClick={() => {
              confirmMethod(item)
            }} />
            <Popover
              content={<div style={{ textAlign: 'center' }}>
                <Switch checked={item.pagepermisson} onChange={() => switchMethod(item)}></Switch>
              </div>} title="页面配置" trigger={item.pagepermisson === undefined ? '' : 'click'}
            >
              <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.default} />
            </Popover>
          </div>
        )
      }
    },
  ];

  const confirmMethod = (item) => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        console.log('OK');
        deleteMethod(item)
      },
      onCancel() {
        console.log('Cancel');
      }
    })
  }

  const deleteMethod = (item) => {
    console.log('delete:', item);

    axios.delete(`http://localhost:5000/users/${item.id}`).then(() => {
      message.loading({
        content: 'Loading...',
        key: 'updatable',
      });
      setTimeout(() => {
        message.success({
          content: 'delete success!',
          key: 'updatable',
          duration: 2,
        });
      }, 1000);
      setdataSource(dataSource.filter((data) => {
        return data.id !== item.id
      }))
    })
  }

  const switchMethod = (item) => {
    console.log(item);
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    setdataSource([...dataSource])

    if (item.grade === 1) {
      axios.patch(`http://localhost:5000/rights/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    } else {
      axios.patch(`http://localhost:5000/children/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    }
  }

  const addFormOk = () => {
    addForm.current.validateFields().then(value => {
      console.log(value);
      setisOpen(false)
      addForm.current.resetFields()
      axios.post(`http://localhost:5000/users`, {
        ...value,
        "roleState": true,
        "default": false
      }).then(res => {
        setdataSource([...dataSource, {
          ...res.data,
          role: roleList.filter(item => item.id === value.roleId)[0]
        }])
      })
    }).catch(err => {
      console.log(err);
    })
  }


  return (
    <div>
      <Button type='primary' onClick={() => { setisOpen(true) }}>添加用户</Button>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey={(item) => item.id} />

      <Modal
        open={isOpen}
        title="添加用户"
        okText="确认"
        cancelText="取消"
        onCancel={() => { setisOpen(false) }}
        onOk={() => {
          console.log('add', addForm);
          addFormOk()
        }}
      >
        <UserForm regionList={regionList} roleList={roleList} ref={addForm} />

      </Modal>
    </div>
  )

}
