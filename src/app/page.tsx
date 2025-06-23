'use client';

import './i18n';
import '@ant-design/v5-patch-for-react-19';
import React from 'react';
import { Layout, Typography, Button, Row, Col, Space, theme } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  DownloadOutlined,
  PlayCircleOutlined,
  InfoCircleOutlined,
  RocketOutlined, 
} from '@ant-design/icons';

import PageHeader from './components/pageHeader';
import PageFooter from './components/pageFooter';
import PartnerBanner from './components/PartnerBanner';
import TeamGrid from './components/TeamGrid';
import XEQDescription from '@/app/components/XEQDescription';
import Citation from './components/Citation';
import FundingDescription from './components/FundingDescription';
import Languages from './components/Languages';
import EventHero from './components/EventHero';
import EventBanner from './components/EventBanner';
import GaugeChart from './components/GaugeChart';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const actions = [
    {
      title: t('cta.try.title'),
      href: '/try-xeq',
      icon: <PlayCircleOutlined />,
      label: t('cta.try.button'),
    },
    {
      title: t('cta.handbook.title'),
      href: '/download-handbook',
      icon: <DownloadOutlined />,
      label: t('cta.handbook.button'),
    },
    {
      title: t('cta.questionnaire.title'),
      href: '/download-questionnaire',
      icon: <DownloadOutlined />,
      label: t('cta.questionnaire.button'),
    },
    {
      title: t('cta.learn.title'),
      href: '/learn-more',
      icon: <InfoCircleOutlined />,
      label: t('cta.learn.button'),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: token.colorBgLayout }}>
      <PageHeader />

      <Content
  style={{
    padding: '3rem 1rem',
    maxWidth: '1200px',
    margin: '0 auto',
    flex: '1 0 auto',
  }}
>
  <div
    style={{
      maxWidth: 700,
      margin: '0 auto',
      backgroundColor: token.colorBgContainer,
      padding: '3rem 2rem',
      borderRadius: token.borderRadiusLG,
      boxShadow: token.boxShadowSecondary,
      textAlign: 'center',
    }}
  >
    <Title level={1} style={{ color: token.colorTextHeading, marginBottom: '1rem' }}>
      {t('hero.title')}
    </Title>

    <Paragraph style={{ color: token.colorTextSecondary, fontSize: '1.1rem', maxWidth: 600, margin: '0 auto 2.5rem' }}>
    The XEQ (XAI Experience Quality) Scale helps measure the user experience of interacting with AI explanations. Psychometrically validated, free to use, and available to try online or download for your research and development needs.
    </Paragraph>

    <Row gutter={[16, 16]} justify="center">
      <Col xs={24} sm={12}>
        <Button
          type="primary"
          size="large"
          icon={<RocketOutlined />}
          href="/try-xeq"
          style={{
            width: '100%',
            borderRadius: '999px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '0.75rem 1.5rem',
          }}
        >
          {t('cta.tryNow', 'Try the XEQ Scale')}
        </Button>
      </Col>
      <Col xs={24} sm={12}>
        <Button
          size="large"
          icon={<DownloadOutlined />}
          href="/download"
          style={{
            width: '100%',
            borderRadius: '999px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            padding: '0.75rem 1.5rem',
          }}
        >
          {t('cta.viewDownloads', 'Go to Downloads')}
        </Button>
      </Col>
    </Row>
  </div>
</Content>


      <XEQDescription />
      <Languages />
      <TeamGrid />
      <PartnerBanner />
      <FundingDescription />
      <Citation />
      <PageFooter />
    </Layout>
  );
};

export default HomePage;

