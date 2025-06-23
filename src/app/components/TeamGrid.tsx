import React from 'react';
import { Row, Col, Typography, Space } from 'antd';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import Link from 'next/link';

import teamMembers from '@/data/teamMembers';

const { Text } = Typography;


const TeamGrid: React.FC = () => (
  <div style={{ maxWidth: 1000, margin: '3rem auto', padding: '1rem' }}>
    <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '2rem' }}>
  Our Team
</Typography.Title>

    <Row gutter={[32, 32]} justify="center">
    {teamMembers.map((member, i) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Col xs={12} sm={12} md={8} lg={6} key={i} style={{ textAlign: 'center' }}>
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
      transition={{ duration: 0.6, delay: i * 0.05 }}
      style={{
        borderRadius: '50%',
        padding: '4px',
        cursor: 'pointer',
        display: 'inline-block'
      }}
    >
      <img
        src={`/assets/Team/${member.src}`}
        alt={member.name}
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          objectFit: 'cover',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        }}
      />
    </motion.div>
  </Link>

  <div>
    <Text strong>{member.name}</Text><br />
    <Text type="secondary">{member.role}</Text>
  </div>
</Space>


    </Col>
  );
})}

    </Row>
  </div>
);

export default TeamGrid;
