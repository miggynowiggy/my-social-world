import React from 'react'
import { supabase } from 'configs/supabase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Dropdown, Layout, Menu, Button, Typography, MenuProps, Row, Col, Affix } from 'antd';
import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons';

const MainLayout = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate()

  const logout = React.useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error?.message) {
      console.log('ERR WHILE LOGGING OUT: ', error)
      toast.error('Somthing went wrong...')
    }
  }, [])

  const handleMenuClick: MenuProps["onClick"] = async (e) => {
    switch (e.key) {
      case 'profile': {
        console.log('WAW PROFILE')
        break;
      }

      case 'logout': {
        await logout()
        break;
      }

      default: {
        console.log('no options')
      }
    }
  }

  const AccountOptions = () => (
    <Menu
      items={[
        {
          key: 'profile',
          label: 'Profile'
        },
        {
          key: 'logout',
          label: "Logout"
        }
      ]}
      onClick={handleMenuClick}
    />
  )

  return (
    <Layout>
      <Layout.Header color="primary" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Row
          align="top"
          justify="space-between" 
        >
          <Col>
            <Typography.Title 
              style={{ color: '#fff', marginTop: 6 }}>POSTBOOK</Typography.Title>
          </Col>
          <Col>
            <Dropdown
              overlay={<AccountOptions />}
              placement="bottomRight"
            >
              <Button type="text" style={{ color: '#fff' }} size="large" icon={<UserOutlined />} />
            </Dropdown>
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content
        style={{
          padding: '0 50px',
          marginTop: '64px'
        }}
      >
        { children }
      </Layout.Content>
    </Layout>
  )
}

export default MainLayout