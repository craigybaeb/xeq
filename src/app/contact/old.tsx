'use client';

import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Form,
  Input,
  Button,
  Row,
  Col,
  Space,
  message,
  theme,
  Card,
} from 'antd';
import {
  MailOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import PageHeader from '@/app/components/pageHeader';
import PageFooter from '@/app/components/pageFooter';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const ContactPage: React.FC = () => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const [submitted, setSubmitted] = useState(false);

  const onFinish = (values: any) => {
    console.log('Contact form submission:', values);
    setSubmitted(true);
    message.success('Thank you for your message.');
    form.resetFields();
  };

  return (
    <Layout style={{ minHeight: '100vh', background: token.colorBgLayout }}>
      <PageHeader />
      <Content style={{ maxWidth: 1300, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            style={{
              background: token.colorBgContainer,
              borderRadius: token.borderRadiusLG,
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              padding: '3rem',
            }}
          >
            <Title level={2} style={{ textAlign: 'center', color: token.colorTextHeading, marginBottom: '1rem' }}>
              Contact Us
            </Title>
            <Paragraph style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 2.5rem', color: token.colorText }}>
              We'd love to hear from you. Whether it's a question about the XEQ Scale, collaboration opportunities, or feedback—drop us a message or use the contact details below.
            </Paragraph>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ textAlign: 'center', padding: '2rem 1rem' }}
              >
                <Title level={3} style={{ color: token.colorSuccess }}>Thank you!</Title>
                <Paragraph>We'll get back to you shortly.</Paragraph>
                <Button type="primary" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <Row gutter={[64, 64]} justify="center" align="top">
                {/* Contact Info */}
                <Col xs={24} md={8}>
                  <Space direction="vertical" size="large">
                    <div>
                      <Title level={4} style={{ color: token.colorTextHeading }}>Email</Title>
                      <Space>
                        <MailOutlined style={{ color: token.colorPrimary }} />
                        <Text copyable style={{ color: token.colorText }}>
                          craig.pirie@rgu.ac.uk
                        </Text>
                      </Space>
                    </div>
                    <div>
                      <Title level={4} style={{ color: token.colorTextHeading }}>Address</Title>
                      <Space align="start">
                        <EnvironmentOutlined style={{ color: token.colorPrimary }} />
                        <Text style={{ color: token.colorText }}>
                          School of Computing,<br />
                          Robert Gordon University,<br />
                          Aberdeen, AB10 7QB<br />
                          United Kingdom
                        </Text>
                      </Space>
                    </div>
                  </Space>
                </Col>

                {/* Contact Form */}
                <Col xs={24} md={16}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={onFinish}
                      requiredMark="optional"
                    >
                      <Row gutter={24}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            label="Your Name"
                            name="name"
                            rules={[{ required: true, message: 'Please enter your name.' }]}
                          >
                            <Input placeholder="e.g., Jane Doe" />
                          </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                          <Form.Item
                            label="Your Email"
                            name="email"
                            rules={[
                              { required: true, message: 'Please enter your email.' },
                              { type: 'email', message: 'Please enter a valid email.' }
                            ]}
                          >
                            <Input placeholder="e.g., jane@example.com" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        label="Subject"
                        name="subject"
                        rules={[{ required: true, message: 'Please enter a subject.' }]}
                      >
                        <Input placeholder="e.g., XEQ questionnaire use" />
                      </Form.Item>

                      <Form.Item
                        label="Message"
                        name="message"
                        rules={[{ required: true, message: 'Please enter your message.' }]}
                      >
                        <TextArea rows={6} placeholder="Type your message here..." />
                      </Form.Item>

                      <Form.Item style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <Button type="primary" htmlType="submit" size="large">
                          Send Message
                        </Button>
                      </Form.Item>
                    </Form>
                  </motion.div>
                </Col>
              </Row>
            )}
          </Card>
        </motion.div>
      </Content>
      <PageFooter />
    </Layout>
  );
};

export default ContactPage;
