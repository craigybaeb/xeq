'use client';

import React from 'react';
import { Typography, Space } from 'antd';

const { Text, Link } = Typography;

const CreativeCommonsNotice: React.FC = () => (
  <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
    <Space direction="vertical" size={4}>
      <Text>
        This work is licensed under a{' '}
        <Link
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
        </Link>.
      </Text>
    </Space>
  </div>
);

export default CreativeCommonsNotice;
