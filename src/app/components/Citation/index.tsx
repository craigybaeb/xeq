'use client';

import React from 'react';
import { Typography, Button, message, theme } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const { Title } = Typography;

const bibtexEntry = `
@article{wijekoon2026xeqscale,
  title={XEQ Scale for Evaluating XAI Experience Quality},
  author={Wijekoon, Anjana and Wiratunga, Nirmalie and Corsar, David and Martin, Kyle and Nkisi-Orji, Ikechukwu and Pirie, Craig and Díaz-Agudo, Belen and Bridge, Derek},
  journal={ACM Transactions on Interactive Intelligent Systems},
  volume={37},
  number={4},
  articleno={111},
  pages={1--30},
  month={jun},
  year={2026},
  publisher={Association for Computing Machinery}
}
`.trim();

const Citation: React.FC = () => {
  const { token } = theme.useToken();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtexEntry);
      message.success('BibTeX copied to clipboard');
    } catch {
      message.error('Failed to copy to clipboard');
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{ maxWidth: 800, margin: '3rem auto', padding: '0 1rem' }}
    >
      <Title level={4} style={{ textAlign: 'center', color: token.colorTextBase }}>
        Cite this work (BibTeX)
      </Title>

      <div
        style={{
          background: token.colorBgContainer,
          border: `1px solid ${token.colorBorder}`,
          borderRadius: 8,
          padding: '1rem 2rem',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word', // Prevent long words from overflowing
          color: token.colorTextBase,
          position: 'relative',
        }}
      >
        <code style={{ display: 'block', overflowX: 'auto' }}>{bibtexEntry}</code>

        <Button
          icon={<CopyOutlined />}
          type="default"
          size="small"
          onClick={handleCopy}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: token.colorPrimaryBg,
            color: token.colorPrimary,
            borderColor: token.colorPrimaryBorder,
          }}
        >
          Copy
        </Button>
      </div>
    </motion.div>
  );
};

export default Citation;
