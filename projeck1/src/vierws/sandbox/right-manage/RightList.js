import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Table, Tag, Button, Modal, message, Popover, Switch } from 'antd'
import {
  DeleteOutlined, EditOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
const { confirm } = Modal;

export default function RightList() {

  const [dataSource, setdataSource] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
      console.log('setdataSource:', res.data);
      const list = res.data
      list[0].children = ""
      setdataSource(list)
    })
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      render: (title) => {
        return <Tag color="blue">{title}</Tag>
      }
    },
    {
      title: '路径',
      dataIndex: 'key',
      render: (key) => {
        return <Tag color="purple">{key}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return (
          <div>
            <Button danger type="primary" shape="circle" icon={<DeleteOutlined />} onClick={() => {
              confirmMethod(item)
            }} />
            <Popover
              content={<div style={{textAlign:'center'}}>
              <Switch checked={item.pagepermisson} onChange={()=>switchMethod(item)}></Switch>
              </div>} title="页面配置" trigger={item.pagepermisson===undefined?'':'click'}
            >
              <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson===undefined}/>
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

    if (item.grade === 1) {
      axios.delete(`http://localhost:5000/rights/${item.id}`).then(() => {
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
    } else {
      let list = dataSource.filter(data => data.id === item.rightId)
      list[0].children = list[0].children.filter(data => data.id !== item.id)
      setdataSource([...dataSource])
      axios.delete(`http://localhost:5000/children/${item.id}`).then(() => {
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
      })
    }
  }

  const switchMethod = (item) => {
    console.log(item);
    item.pagepermisson = item.pagepermisson===1?0:1
    setdataSource([...dataSource])

    if(item.grade===1){
      axios.patch(`http://localhost:5000/rights/${item.id}`,{
        pagepermisson:item.pagepermisson
      })
    }else{
      axios.patch(`http://localhost:5000/children/${item.id}`,{
        pagepermisson:item.pagepermisson
      })
    }
  }


  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
    </div>
  )

}
