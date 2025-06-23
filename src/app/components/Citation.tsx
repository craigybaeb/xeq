'use client';

import React from 'react';
import { Typography, Button, message, theme } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const { Title } = Typography;

const bibtexEntry = `
@misc{wijekoon2025xeqscaleevaluatingxai,
      title={XEQ Scale for Evaluating XAI Experience Quality}, 
      author={Anjana Wijekoon and Nirmalie Wiratunga and David Corsar and Kyle Martin and Ikechukwu Nkisi-Orji and Belen Díaz-Agudo and Derek Bridge},
      year={2025},
      eprint={2407.10662},
      archivePrefix={arXiv},
      primaryClass={cs.AI},
      url={https://arxiv.org/abs/2407.10662}, 
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
          color: token.colorTextBase,
          position: 'relative',
        }}
      >
        <code>{bibtexEntry}</code>

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
