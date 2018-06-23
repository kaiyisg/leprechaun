import React, { Component } from "react";

import "./App.css";
import { subscribeToTimer } from "./api/socket";
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
    response: "",
    timestamp: "no timestamp yet"
  };

  componentDidMount() {
    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp
      })
    );
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App" style={{ height: "100%" }}>
        <Layout className="layout" style={{ height: "100%" }}>
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <p className="App-intro">{this.state.response}</p>
              <p className="App-socket">
                This is the timer value: {this.state.timestamp}
              </p>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
