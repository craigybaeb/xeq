'use client';

import React from 'react';
import { Layout, Typography, Space, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import CreativeCommonsNotice from './CreativeCommonsNotice';

const { Footer } = Layout;
const { Text, Link, Paragraph } = Typography;

const PageFooter: React.FC = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  return (
    <Footer
      style={{
        textAlign: 'center',
        padding: '2rem 1rem',
        backgroundColor: token.colorBgContainer,
        borderTop: `1px solid ${token.colorSplit}`,
        color: token.colorTextSecondary,
      }}
    >
      <Space direction="vertical" size="small" style={{ maxWidth: 800, margin: '0 auto' }}>
        <Paragraph style={{ marginBottom: 0 }}>
          <Text strong>XEQ Team</Text>
        </Paragraph>
        <Paragraph style={{ marginBottom: 0 }}>
          <Text>Email: </Text>
          <Link href="mailto:xeq@rgu.ac.uk">xeq@rgu.ac.uk</Link>
        </Paragraph>
        <Paragraph style={{ marginBottom: 0 }}>
          <Text>
            Address: Sir Ian Wood Building, Robert Gordon University, Garthdee Road, Aberdeen, UK, AB10 7AQ
          </Text>
        </Paragraph>
        <Paragraph style={{ margin: '1rem 0 0 0' }}><a href="https://isee4xai.com/">iSee Project</a>©2025 – Evaluating the Human Experience of Explainable AI</Paragraph>

        <CreativeCommonsNotice />
      </Space>
    </Footer>
  );
};

export default PageFooter;
