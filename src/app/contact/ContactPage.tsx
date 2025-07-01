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

import PageHeader from '@/app/components/PageHeader';
import PageFooter from '@/app/components/PageFooter';
import styles from './styles.module.css';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

// Contact page component displaying email and physical address
const ContactPage: React.FC = () => {
  const { token } = theme.useToken(); // Ant Design theming

  return (
    <Layout style={{ minHeight: '100vh', background: token.colorBgLayout }}>
      <PageHeader />
      <Content className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className={styles.card} style={{ background: token.colorBgContainer }}>
            <Title level={2} className={styles.title}>
              Contact Us
            </Title>

            <Paragraph className={styles.paragraph}>
              We&apos;d love to hear from you. Whether it&apos;s a question about the XEQ Scale, collaboration opportunities, or feedback—use the contact details below.
            </Paragraph>

            <Row justify="center">
              <Col xs={24} md={12}>
                <Space direction="vertical" size="large" className={styles.info}>
                  {/* Email Section */}
                  <div>
                    <Title level={4} className={styles.heading}>Email</Title>
                    <Space>
                      <MailOutlined style={{ color: token.colorPrimary }} />
                      <Text copyable className={styles.text}>xeq@rgu.ac.uk</Text>
                    </Space>
                  </div>

                  {/* Address Section */}
                  <div>
                    <Title level={4} className={styles.heading}>Address</Title>
                    <Space align="start">
                      <EnvironmentOutlined style={{ color: token.colorPrimary }} />
                      <Text className={styles.text}>
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
