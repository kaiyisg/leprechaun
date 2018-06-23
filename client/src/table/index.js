import React from 'react'
import { Table } from 'antd'

const columns = [
  {
    title: 'Employee',
    dataIndex: 'name',
    render: (text) => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Start Time',
    dataIndex: 'startTime',
  },
  {
    title: 'End Time',
    dataIndex: 'endTime',
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
  },
  {
    title: 'Cost',
    dataIndex: 'cost',
  },
  {
    title: 'Paid',
    dataIndex: 'paid',
  },
]
const data = [
  {
    key: '1',
    name: 'Jeremy Hon',
    startTime: '',
    endTime: '',
    rate: '$13.50',
    cost: '',
    paid: '',
  },
  {
    key: '2',
    name: 'Janson Seah',
    startTime: '',
    endTime: '',
    rate: '$13.50',
    cost: '',
    paid: '',
  },
  {
    key: '3',
    name: 'Huang Yixuan',
    startTime: '',
    endTime: '',
    rate: '$13.50',
    cost: '',
    paid: '',
  },
  {
    key: '4',
    name: 'Lee Kai Yi',
    startTime: '',
    endTime: '',
    rate: '$13.50',
    cost: '',
    paid: '',
  },
]

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    )
  },
}

const ClockinTable = () => (
  <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
)

export default ClockinTable
