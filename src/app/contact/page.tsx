'use client';

import React from 'react';
import {
  Layout,
  Typography,
  Row,
  Col,
  Space,
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

const ContactPage: React.FC = () => {
  const { token } = theme.useToken();

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
              We'd love to hear from you. Whether it's a question about the XEQ Scale, collaboration opportunities, or feedback—use the contact details below.
            </Paragraph>

            <Row justify="center">
              <Col xs={24} md={12}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div>
                    <Title level={4} style={{ color: token.colorTextHeading }}>Email</Title>
                    <Space>
                      <MailOutlined style={{ color: token.colorPrimary }} />
                      <Text copyable style={{ color: token.colorText }}>
                        xeq@rgu.ac.uk
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
                        Aberdeen, AB10 7GJ<br />
                        United Kingdom
                      </Text>
                    </Space>
                  </div>
                </Space>
              </Col>
            </Row>
          </Card>
        </motion.div>
      </Content>
      <PageFooter />
    </Layout>
  );
};

export default ContactPage;
