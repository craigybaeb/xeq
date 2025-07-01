'use client';

import React from 'react';
import { Layout, Typography, theme, Card, Button, Space } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import PageFooter from '@/app/components/PageFooter';
import PageHeader from '@/app/components/PageHeader';
import styles from './styles.module.css';
import { TeamMemberClientProps } from './types';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

// Client-side component that displays a team member profile with navigation to adjacent members
export default function TeamMemberClient({ member, prev, next }: TeamMemberClientProps) {
  const { token } = theme.useToken(); // Get Ant Design theme tokens for consistent styling

  return (
    <Layout style={{ minHeight: '100vh', background: token.colorBgLayout }}>
      <PageHeader />

      <Content className={styles.content}>
        {/* Main animation wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            className={styles.card}
            style={{ backgroundColor: token.colorBgContainer }}
          >
            {/* Avatar animation */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Image
                src={`/assets/Team/${member.src}`}
                alt={member.name}
                width={150}
                height={150}
                className={styles.avatar}
                style={{ border: `4px solid ${token.colorPrimary}` }}
              />
            </motion.div>

            {/* Name, role, and bio animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Title level={3}>{member.name}</Title>
              <Text type="secondary">{member.role}</Text>
              <Paragraph>{member.bio}</Paragraph>
            </motion.div>

            {/* Navigation to previous and next members */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Space className={styles.nav}>
                {/* Previous team member button */}
                <Link href={`/team/${prev.slug}`}>
                  <Button type="default" className={styles.navBtn}>
                    <Image
                      src={`/assets/Team/${prev.src}`}
                      alt={prev.name}
                      width={32}
                      height={32}
                      className={styles.navImg}
                    />
                    ← {prev.name.split(' ')[0]}
                  </Button>
                </Link>

                {/* Next team member button */}
                <Link href={`/team/${next.slug}`}>
                  <Button type="primary" className={styles.navBtn}>
                    {next.name.split(' ')[0]} →
                    <Image
                      src={`/assets/Team/${next.src}`}
                      alt={next.name}
                      width={32}
                      height={32}
                      className={styles.navImg}
                    />
                  </Button>
                </Link>
              </Space>
            </motion.div>
          </Card>
        </motion.div>
      </Content>

      <PageFooter />
    </Layout>
  );
}
