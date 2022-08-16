import { supabase } from 'configs/supabase'
import toast from 'react-hot-toast'
import { Button, Card, Col, Form, Input, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import BlankLayout from 'layouts/BlankLayout'

const Login = () => {
  const navigate = useNavigate()

  const onFormSubmit = async ({ email, password }: { email: string, password: string}) => {
    const { error } = await supabase.auth.signIn({ email, password });
    if (error?.message) {
      toast.error(error?.message || 'Something went wrong, please try again later...');
    }
  }

  return (
    <BlankLayout>
      <Row justify="center" align="middle" style={{ height: '100%' }}>
        <Col xs={{ span: 20 }} sm={{ span: 20 }} md={{ span: 8 }}>
          <Card 
            title="Login" 
            bordered 
            style={{ width: '100%' }}
          >
            <Form
              name="loginForm"
              layout="vertical"
              wrapperCol={{
                span: 24
              }}
              labelCol={{
                span: 6
              }}
              initialValues={{
                email: '',
                password: ''
              }}
              onFinish={onFormSubmit}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Email is required!',
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Password is required!'
                  },
                  {
                    min: 8,
                    message: 'Password should be 8 characters long!'
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{ span: 24 }}
              >
                <Button 
                  type="primary" 
                  htmlType="submit"
                  block
                >
                  Login
                </Button>
              </Form.Item>

              <Form.Item
                wrapperCol={{ span: 24 }}
              >
                <Button 
                  type="dashed" 
                  block
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </Form.Item>

              <Form.Item
                wrapperCol={{ span: 24 }}
              >
                <Button
                  type="text"
                  onClick={() => navigate('/forgot-password')}
                  block
                >
                    Forgot Password
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </BlankLayout>
  )
}

export default Login