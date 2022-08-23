import React from 'react'
import { Layout } from 'antd';
import './antdstyles.less'

const { Header, Footer, Sider, Content } = Layout;

const LoginPageLayout:React.FC=()=> {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default LoginPageLayout