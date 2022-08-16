import { useNavigate } from 'react-router-dom'
import { supabase } from 'configs/supabase'
import toast from 'react-hot-toast'
import { Card, Col, Row, Form, Input, Button } from 'antd';
import BlankLayout from 'layouts/BlankLayout';

const ForgotPassword = () => {
  const navigate = useNavigate()

  const onFormSubmit = async ({ email }: { email: string }) => {
    const { error } = await supabase.functions.invoke('forgot-password', {
      body: JSON.stringify({ email })
    });

    if (error?.message) {
      toast.error(error?.message || 'Something went wrong, please try again later');
    } else {
      navigate('/forgot-password-success')
    }
  }

  return (
    <BlankLayout>
      <Row align="middle" justify="center" style={{ height: '100%' }}>
        <Col xs={{ span: 20 }} sm={{ span: 20 }} md={{ span: 8 }}>
          <Card 
            title="Forgot Password"
            style={{
              width: '100%',
              height: '100%'
            }}
          >
            <Form
              name="forgotPasswordForm"
              layout="vertical"
              initialValues={{
                email: ''
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

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Send Password Reset Link
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </BlankLayout>
  )
}

export default ForgotPassword