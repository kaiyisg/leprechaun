import React, { Component } from 'react'

import './App.css'
import ClockinTable from './table'
import { subscribeToTimer } from './api/socket'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'

const { Header, Content, Footer, Sider } = Layout

class App extends Component {
  state = {
    response: '',
    timestamp: 'no timestamp yet',
    collapsed: false,
  }

  componentDidMount() {
    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp,
      }),
    )
    // this.callApi()
    //   .then(res => this.setState({ response: res.express }))
    //   .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello')
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
                padding: 0,
                display: 'flex',
                padding: '24px',
              }}
            >
              <span style={{ 'font-size': '24px' }}>Payroll</span>
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              <p className="App-intro">{this.state.response}</p>
              <p className="App-socket">
                This is the timer value: {this.state.timestamp}
              </p>
              <ClockinTable />
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
