'use client';

import React from 'react';
import { Card, Typography, theme } from 'antd';
import { motion } from 'framer-motion';

const { Title, Paragraph, Text } = Typography;

const FundingDescription: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <Card
        bordered={false}
        style={{
          backgroundColor: token.colorInfoBg,
          color: token.colorText,
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowSecondary,
          padding: '2.5rem',
          maxWidth: 900,
          margin: '3rem auto',
        }}
      >
        <Title level={3} style={{ color: token.colorTextHeading, textAlign: 'center' }}>
          🔍 Internationally Backed Research
        </Title>

        <Paragraph style={{ fontSize: '1.1rem', textAlign: 'center' }}>
          This project has received funding through the CHIST-ERA 2019 call on
          Explainable Machine Learning-based Artificial Intelligence (XAI)
          <Text type="secondary"> (CHIST-ERA-19-XAI-008)</Text>.
        </Paragraph>

        <Paragraph style={{ fontSize: '1.1rem', textAlign: 'center' }}>
          <Text strong>CHIST-ERA</Text> is a bold, pathfinding initiative for European coordinated research
          in future and emerging information and communication technologies — supporting
          innovation that anticipates tomorrow’s societal challenges.
        </Paragraph>
      </Card>
    </motion.div>
  );
};

export default FundingDescription;
