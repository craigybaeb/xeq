'use client';

import React from 'react';
import { Row, Col, Typography, Space } from 'antd';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';

import teamMembers from '@/data/teamMembers';

const { Text } = Typography;

type TeamMemberProps = {
  member: {
    name: string;
    role: string;
    slug: string;
    src: string;
  };
  index: number;
};

const TeamMemberCard: React.FC<TeamMemberProps> = ({ member, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Col xs={12} sm={12} md={8} lg={6} style={{ textAlign: 'center' }}>
      <Space direction="vertical" align="center">
        <Link href={`/team/${member.slug}`} style={{ textDecoration: 'none' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          }}
          transition={{ duration: 0.6, delay: index * 0.05 }}
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%', // makes it circular
            overflow: 'hidden',   // clips the image to the circle
            cursor: 'pointer',
            display: 'inline-block',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}
        >
          <Image
            src={`/assets/Team/${member.src}`}
            alt={member.name}
            width={120}
            height={120}
            style={{
              objectFit: 'cover', // fill entire area
              width: '100%',
              height: '100%',
              display: 'block', // removes inline spacing artifacts
            }}
          />
        </motion.div>



        </Link>

        <div>
          <Text strong>{member.name}</Text>
          <br />
          <Text type="secondary">{member.role}</Text>
        </div>
      </Space>
    </Col>
  );
};

const TeamGrid: React.FC = () => (
  <div style={{ maxWidth: 1000, margin: '3rem auto', padding: '1rem' }}>
    <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
      Our Team
    </Typography.Title>

    <Row gutter={[32, 32]} justify="center">
      {teamMembers.map((member, index) => (
        <TeamMemberCard key={member.slug} member={member} index={index} />
      ))}
    </Row>
  </div>
);

export default TeamGrid;
