import { Row, Col, Typography, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom'
import BlankLayout from 'layouts/BlankLayout';

const ForgotPasswordSuccess = () => {
  const navigate = useNavigate()

  return (
    <BlankLayout>
      <Row align="middle" justify="center" style={{ height: '100%' }}>
        <Col xs={{ span: 20 }} sm={{ span: 20 }} md={{ span: 8 }}>
          <Card>
            <Typography.Title>Password Reset Email was Sent!</Typography.Title>
            <Typography.Paragraph>Please check your email to proceed with the password reset</Typography.Paragraph>
            <Button 
              type="primary" 
              onClick={() => navigate('/login')} 
              style={{ marginBlock: 4 }}
            >Back to Login</Button>
          </Card>
        </Col>
      </Row>
    </BlankLayout>
  )
}

export default ForgotPasswordSuccess