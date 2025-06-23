'use client';

import React from 'react';
import { Typography, Card, Row, Col, theme } from 'antd';
import { BulbOutlined, RocketOutlined, SmileOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import RefinementSection from './RefinementSection'; 

const { Title, Paragraph, Text } = Typography;

const principles = [
  {
    title: 'Learning',
    description: 'The extent to which the experience develops knowledge or competence.',
    icon: <BulbOutlined style={{ fontSize: '2.5rem', color: '#1890ff' }} />,
    color: '#e6f7ff',
  },
  {
    title: 'Utility',
    description: 'The contribution of the experience towards task completion.',
    icon: <RocketOutlined style={{ fontSize: '2.5rem', color: '#9254de' }} />,
    color: '#f9f0ff',
  },
  {
    title: 'Fulfilment',
    description: 'The degree to which the experience supports the achievement of XAI goals.',
    icon: <SmileOutlined style={{ fontSize: '2.5rem', color: '#fa8c16' }} />,
    color: '#fff7e6',
  },
  {
    title: 'Engagement',
    description: 'The quality of the interaction between the user and the XAI system.',
    icon: <ThunderboltOutlined style={{ fontSize: '2.5rem', color: '#52c41a' }} />,
    color: '#f6ffed',
  },
];

const XEQDescription: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <div style={{ maxWidth: 1200, margin: '4rem auto', padding: '0 1rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Card
          style={{
            padding: '3rem 2rem',
            background: token.colorPrimaryBg,
            borderRadius: '24px',
            textAlign: 'center',
            boxShadow: token.boxShadowSecondary,
          }}
          bordered={false}
        >
          <Title level={2} style={{ color: token.colorTextHeading }}>What is the XEQ Scale?</Title>
          <Paragraph style={{ fontSize: '1.15rem', maxWidth: 900, margin: '0 auto', color: token.colorText }}>
          The XEQ Scale is a tool for measurement of XAI experiences across four key dimensions: Learning, Utility, Fulfilment, and Engagement. 
          </Paragraph>
        </Card>
      </motion.div>

      <Row gutter={[24, 24]} justify="center" style={{ marginTop: '3rem' }}>
      {principles.map(({ title, description, icon, color }, index) => (
  <Col xs={24} sm={12} md={12} lg={6} key={title}>
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      style={{ height: '100%' }}
    >
      <Card
        bordered={false}
        style={{
          backgroundColor: color,
          borderRadius: 16,
          padding: '2rem 1rem',
          height: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
        }}
      >
        <div>
          <div style={{ marginBottom: '1rem' }}>{icon}</div>
          <Title level={4}>{title}</Title>
          <Text>{description}</Text>
        </div>
      </Card>
    </motion.div>
  </Col>
))}

</Row>


      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
   <RefinementSection />


      </motion.div>
    </div>
  );
};

export default XEQDescription;
