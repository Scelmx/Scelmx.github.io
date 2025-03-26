import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const onFinish = (values: any) => {
    setLoading(true);
    
    // 模拟登录请求
    setTimeout(() => {
      // 在实际应用中，这里应该调用API验证用户名和密码
      if (values.username === 'admin' && values.password === 'admin123') {
        message.success('登录成功');
        // 将用户信息存储在 localStorage 中
        localStorage.setItem('adminUser', JSON.stringify({ username: values.username, role: 'admin' }));
        // 登录成功后跳转到仪表盘
        navigate('/dashboard');
      } else {
        message.error('用户名或密码错误');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f5f5f5'
    }}>
      <Card 
        style={{ 
          width: 400, 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: 4
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#3498db', marginBottom: 10 }}>
            微企定制
          </div>
          <Title level={3} style={{ marginBottom: 5 }}>管理系统</Title>
          <Paragraph type="secondary">请登录以访问管理后台</Paragraph>
        </div>
        
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <a href="#" style={{ color: '#3498db' }}>忘记密码?</a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              style={{ width: '100%' }}
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
          
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Paragraph type="secondary" style={{ fontSize: 13 }}>
              登录提示: 用户名 admin, 密码 admin123
            </Paragraph>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;