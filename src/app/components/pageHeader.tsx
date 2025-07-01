'use client';

import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Drawer,
  Button,
  Grid,
  Space,
  Menu,
} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';

const { Header } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const PageHeader: React.FC = () => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { key: 'home', label: <Link href="/">Home</Link> },
    { key: 'try', label: <Link href="/try-xeq">Try It Out</Link> },
    { key: 'download', label: <Link href="/download">Download</Link> },
  ];

  return (
    <Header style={{ backgroundColor: '#001529', padding: '0 1rem' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        {/* Logo and Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link href="/">
            <Image
              src="/assets/isee.png"
              alt="iSee Logo"
              width={screens.xs ? 80 : 100}
              height={screens.xs ? 32 : 40}
              style={{ objectFit: 'contain' }}
            />
          </Link>
          <Title
            level={screens.xs ? 5 : 3}
            style={{
              color: 'white',
              margin: 0,
              fontSize: screens.xs ? '1rem' : undefined,
              lineHeight: 1.2,
              maxWidth: screens.xs ? '140px' : 'none',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {t('header.title', 'XAI Experience Quality (XEQ) Scale')}
          </Title>
        </div>

        {/* Navigation */}
        {screens.md ? (
          <Space size="large">
            <Link href="/" style={{ color: 'white' }}>
              Home
            </Link>
            <Link href="/try-xeq" style={{ color: 'white' }}>
              Try It Out
            </Link>
            <Link href="/download" style={{ color: 'white' }}>
              Download
            </Link>
          </Space>
        ) : (
          <>
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: 20, color: 'white' }} />}
              onClick={() => setDrawerOpen(true)}
            />
            <Drawer
              title="Menu"
              placement="right"
              onClose={() => setDrawerOpen(false)}
              open={drawerOpen}
              bodyStyle={{ padding: 0 }}
            >
              <Menu mode="vertical" items={menuItems} />
            </Drawer>
          </>
        )}
      </div>
    </Header>
  );
};

export default PageHeader;
