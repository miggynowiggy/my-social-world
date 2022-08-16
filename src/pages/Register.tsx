import { supabase } from 'configs/supabase'
import toast from 'react-hot-toast'
import { Button, Card, Col, Form, Input, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { IUser } from 'models';
import BlankLayout from 'layouts/BlankLayout';

interface IRegisterForm {
  fullName: string;
  email: string;
  password: string
}

const Register = () => {
  const navigate = useNavigate()

  const onFormSubmit = async ({ fullName, email, password }: IRegisterForm) => {
    let { error } = await supabase.auth.signUp({ email, password });
    if (error?.message) {
      toast.error(error?.message || 'Something went wrong, please try again later...');
      return;
    }

    const response = await supabase
      .from<IUser>('user_profiles')
      .insert({
        full_name: fullName,
        email,
        auth_id: supabase.auth.user()?.id || ''
      })

    if (response.error?.message) {
      console.log('ERR WHILE REGISTERING USER TO DB: ', response.error);
      toast.error('Something went wrong, please try again later...');
      return;
    }

    toast.success(`Welcome ${fullName} 🥳! Please check your email to verify your identity.`)
  }

  return (
    <BlankLayout>
      <Row justify="center" align="middle" style={{ height: '100%' }}>
        <Col xs={{ span: 20 }} sm={{ span: 20 }} md={{ span: 8 }}>
          <Card 
            title="Register" 
            bordered 
            style={{ width: '100%' }}
          >
            <Form
              name="registerForm"
              initialValues={{
                fullName: '',
                email: '',
                password: ''
              }}
              onFinish={onFormSubmit}
            >
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: 'Full Name is required!',
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Email is required!'
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
                  Register
                </Button>
              </Form.Item>

              <Form.Item
                wrapperCol={{ span: 24 }}
              >
                <Button
                  type="text"
                  onClick={() => navigate('/login')}
                  block
                >
                  Go to Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </BlankLayout>
  )
}

export default Register