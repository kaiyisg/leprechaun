import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'

import './App.css'
import ClockinTable from './table'
import { subscribeClockin } from './api/socket'
import { Layout } from 'antd'

const { Header, Content, Footer } = Layout

class App extends Component {
  state = {
    payroll: [],
  }

  setupClockin = () => {
    subscribeClockin((err, clockinData) => {
      const { phoneNumber, startTime } = clockinData
      const currState = _.find(this.state.payroll, { phoneNumber })
      const newPayroll = _.map(this.state.payroll, (item) => {
        if (item.phoneNumber === phoneNumber) {
          return { ...item, startTime }
        }
        return item
      })
      this.setupClockout(phoneNumber)
      this.setState({
        payroll: newPayroll,
      })
    })
  }

  setupClockout = (phoneNumber) => {
    const endTime = moment()
      .add(4, 'h')
      .format('ddd, MMM DD, h:mm:ss a')
    const cost = '$54.00'
    setTimeout(() => {
      const newPayroll = _.map(this.state.payroll, (item) => {
        if (item.phoneNumber === phoneNumber) {
          return { ...item, endTime, cost }
        }
        return item
      })
      this.setState({
        payroll: newPayroll,
      })
    }, 3000)
  }

  componentDidMount() {
    this.setupClockin()
    this.callApi()
      .then((res) => {
        this.setState({ payroll: res })
      })
      .catch((err) => console.log(err))
  }

  callApi = async () => {
    const response = await fetch('/api/payroll')
    const body = await response.json()

    if (response.status !== 200) throw Error(body.message)

    return body
  }

  render() {
    return (
      <div className="App" style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
          <Layout>
            <Header
              style={{
                background: '#fff',
                display: 'flex',
                padding: '24px',
              }}
            >
              <span style={{ fontSize: '24px' }}>Payroll</span>
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              <ClockinTable data={this.state.payroll} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Leprechaun ©2018 Created by Leprechaun Pte. Ltd.
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default App
