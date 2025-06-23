'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Layout, Typography, theme, Card, Button, Space } from 'antd';
import { motion } from 'framer-motion';
import teamMembers from '@/data/teamMembers';
import PageFooter from '@/app/components/pageFooter';
import PageHeader from '@/app/components/pageHeader';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function TeamMemberPage() {
  const { slug } = useParams();
  const memberIndex = teamMembers.findIndex(m => m.slug === slug);
  const member = teamMembers[memberIndex];

  const { token } = theme.useToken();

  if (memberIndex === -1) {
    return (
      <>
        <PageHeader />
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <Title level={2}>Member not found</Title>
        </div>
        <PageFooter />
      </>
    );
  }

  const prevMember = teamMembers[(memberIndex - 1 + teamMembers.length) % teamMembers.length];
  const nextMember = teamMembers[(memberIndex + 1) % teamMembers.length];

  return (
    <Layout style={{ minHeight: '100vh', background: token.colorBgLayout }}>
      <PageHeader />
      <Content style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Card
            style={{
              backgroundColor: token.colorBgContainer,
              borderRadius: token.borderRadius,
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
              style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}
            >
              <img
                src={`/assets/Team/${member.src}`}
                alt={member.name}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `4px solid ${token.colorPrimary}`,
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Title level={3} style={{ color: token.colorTextBase }}>{member.name}</Title>
              <Text type="secondary" style={{ display: 'block', marginBottom: '1rem' }}>
                {member.role}
              </Text>
              <Paragraph style={{ textAlign: 'center' }}>{member.bio}</Paragraph>
            </motion.div>

            <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.8, duration: 0.5 }}
  style={{ marginTop: '2rem' }}
>
  <Space style={{ justifyContent: 'space-between', width: '100%' }}>
    <Link href={`/team/${prevMember.slug}`}>
      <Button type="default" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <img
          src={`/assets/Team/${prevMember.src}`}
          alt={prevMember.name}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            objectFit: 'cover',
            border: `2px solid ${token.colorBorder}`,
          }}
        />
        ← {prevMember.name.split(' ')[0]}
      </Button>
    </Link>

    <Link href={`/team/${nextMember.slug}`}>
      <Button type="primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {nextMember.name.split(' ')[0]} →
        <img
          src={`/assets/Team/${nextMember.src}`}
          alt={nextMember.name}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            objectFit: 'cover',
            border: `2px solid ${token.colorPrimary}`,
          }}
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
