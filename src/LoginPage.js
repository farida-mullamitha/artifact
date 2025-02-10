import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className="login-container">
      <Form form={form} onFinish={handleSubmit} className="login-form">
        <Form.Item name="userName" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input prefix={<UserOutlined style={{ fontSize: 15 }} />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input prefix={<LockOutlined style={{ fontSize: 15 }} />} type="password" placeholder="Password" />
        </Form.Item>
        {/* <div>
            <Form.Item name="remember" valuePropName="checked" initialValue={true}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="#">
                Forgot password
            </a>
            </div> */}

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="#">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
