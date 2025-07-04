'use client';

import React from 'react';
import { Card, Typography, theme } from 'antd';
import { motion } from 'framer-motion';
import languages from '@/data/languages';

const { Title, Text } = Typography;

const LanguageSelector: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: 800, margin: '0 auto' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Available Languages
      </Title>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {languages.map((lang, index) => {
          const Icon = lang.icon; // this is now a component
          return (
            <motion.div
              key={lang.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                hoverable
                style={{
                  width: 220,
                  textAlign: 'center',
                  borderRadius: 12,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  backgroundColor: token.colorBgContainer,
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  <Icon />
                </div>
                <Text strong>{lang.language}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '0.85rem' }}>
                  Translated by {lang.author}
                </Text>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageSelector;
