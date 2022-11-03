import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { Table, Tag, Button, Modal, message, Tree,  } from 'antd'
import {
  DeleteOutlined, UnorderedListOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
const { confirm } = Modal;

export default function RoleList() {

  const [dataSource, setdataSource] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rightList, setRightList] = useState([])
  const [currentRights, setCurrentRights] = useState([])
  const [currentId, setCurrentId] = useState(0)

  useEffect(() => {
    axios.get("http://localhost:5000/roles").then(res => {
      console.log(res.data);
      setdataSource(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
      console.log(res.data);
      setRightList(res.data)
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
      title: '角色名称',
      dataIndex: 'roleName',
      render: (roleName) => {
        return <Tag color="blue">{roleName}</Tag>
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

            <Button type="primary" shape="circle" icon={<UnorderedListOutlined />} onClick={() => {
              setIsModalOpen(true)
              setCurrentRights(item.rights)
              setCurrentId(item.id)
              }} />
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

  const handleOk = () => {
    console.log(currentRights);
    setIsModalOpen(false)
    setdataSource(dataSource.map((item) => {
      if(item.id===currentId) {
        return {
          ...item,
          rights:currentRights
        }
      }
      return item
    }))

    axios.patch(`http://localhost:5000/roles/${currentId}`,{
      rights:currentRights
    })

  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    setCurrentRights(checkedKeys.checked)
  };

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey={(item) => item.id} />

      <Modal title="权限分配" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          checkedKeys={currentRights}
          treeData={rightList}
          onCheck={onCheck}
          checkStrictly={true}
        />
      </Modal>

    </div>
  )
}
