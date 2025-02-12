import React, { useState } from 'react';

import { Button, Form, Grid, Input, message, theme, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const onFinish = async values => {
    setLoading(true);
    try {
      const data = await loginUser(values.username, values.password);
      if (data?.accessToken) {
        localStorage.setItem('token', data.accessToken);
        navigate('/home');
      } else {
        message.error('Login failed: No token received');
      }
    } catch (error) {
      message.error(error.message || 'Login failed');
    }
    setLoading(false);
  };

  const styles = {
    container: {
      margin: '0 auto',
      padding: screens.md ? '48px' : '32px 16px',
      width: '380px',
    },
    footer: {
      marginTop: '16px',
      textAlign: 'center',
    },
    section: {
      alignItems: 'center',
      display: 'flex',
      height: screens.sm ? '100vh' : 'auto',
      justifyContent: 'center',
      padding: screens.md ? '64px 0' : '0',
    },
    text: {
      color: '#8c8c8c',
    },
    title: {
      fontSize: screens.md ? '24px' : '20px',
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Title style={styles.title}>Sign in</Title>
          <Text style={styles.text}>Welcome back ! Please enter your details below to sign in.</Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item style={{ marginBottom: '0px' }}>
            <Button block="true" type="primary" htmlType="submit" loading={loading}>
              Log in
            </Button>
            <div style={styles.footer}>
              <Text style={styles.text}>Don't have an account?</Text> <Link href="/register">Sign up now</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
