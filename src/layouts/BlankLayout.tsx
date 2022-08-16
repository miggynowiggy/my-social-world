import { PropsWithChildren } from 'react'
import { Layout } from 'antd';

const BlankLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout
      style={{
        height: '100vh',
        width: '100vw'
      }}
    >
      <Layout.Content>
        { children }
      </Layout.Content>
    </Layout>
  )
}

export default BlankLayout