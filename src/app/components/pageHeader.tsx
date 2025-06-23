'use client';

import React from 'react';
import { Layout, Typography, Switch, Space, Dropdown, Menu } from 'antd';
import { BulbOutlined, BulbFilled, DownOutlined } from '@ant-design/icons';
import { useThemeMode } from '../ThemeContext';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const { Header } = Layout;
const { Title } = Typography;

const PageHeader: React.FC = () => {
  const { t } = useTranslation();
  const { mode, toggle } = useThemeMode();

  return (
    <Header style={{ backgroundColor: '#001529', padding: '0 2rem' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/">
          <img
            src="/assets/isee.png"
            alt="iSee Logo"
            style={{ height: 20, objectFit: 'contain' }}
          />
          </Link>
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            {t('header.title', "XAI Experience Quality (XEQ) Scale")}
          </Title>
        </div>

        <Space size="large">
        <Link href="/" style={{ color: 'white' }}>
            Home
          </Link>
          <Link href="/try-xeq" style={{ color: 'white' }}>
            Try It Out
          </Link>
          {/* <Link href="/contact" style={{ color: 'white' }}>
            Contact
          </Link> */}

          <Link href="/download" style={{ color: 'white' }}>
            Download
          </Link>

          {/* <Switch
            checked={mode === 'dark'}
            onChange={toggle}
            checkedChildren={<BulbFilled />}
            unCheckedChildren={<BulbOutlined />}
          /> */}
        </Space>
      </div>
    </Header>
  );
};

export default PageHeader;
