import React from 'react'
import { Table } from 'antd'
import moment from 'moment'

const columns = [
  {
    title: 'Employee',
    dataIndex: 'name',
    render: (text) => (
      <a href="javascript:;" style={{ color: '#49C0BE' }}>
        {text}
      </a>
    ),
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
    title: 'Payout',
    dataIndex: 'cost',
  },
  {
    title: 'Paid',
    dataIndex: 'paid',
  },
]

// rowSelection object indicates the need for row selection
// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(
//       `selectedRowKeys: ${selectedRowKeys}`,
//       'selectedRows: ',
//       selectedRows,
//     )
//   },
// }

const ClockinTable = ({ data }) => <Table columns={columns} dataSource={data} />

export default ClockinTable
