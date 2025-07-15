'use client';

import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Drawer,
  Button,
  Menu,
} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import styles from './PageHeader.module.css';

const { Header } = Layout;
const { Title } = Typography;

const PageHeader: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { key: 'home', label: <Link href="/">Home</Link> },
    { key: 'try', label: <Link href="/try-xeq">Try It Out</Link> },
    { key: 'download', label: <Link href="/download">Download</Link> },
  ];

  return (
    <Header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo and Title */}
        <div className={styles.logoSection}>
          <Link href="/">
            <Image
              src="/assets/isee.png"
              alt="iSee Logo"
              width={100}
              height={40}
              priority
              className={styles.logo}
            />
          </Link>
          <Title level={3} className={styles.title}>
            XAI Experience Quality (XEQ) Scale
          </Title>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/try-xeq">Try It Out</Link>
          <Link href="/download">Download</Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          className={styles.menuButton}
          type="text"
          icon={<MenuOutlined style={{ fontSize: 20, color: 'white' }} />}
          onClick={() => setDrawerOpen(true)}
        />

        {/* Mobile Drawer */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          styles={{
            body: { padding: 0 },
          }}
        >
          <Menu mode="vertical" items={menuItems} />
        </Drawer>
      </div>
    </Header>
  );
};

export default PageHeader;
