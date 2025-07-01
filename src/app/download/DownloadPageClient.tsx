// app/download/DownloadPageClient.tsx
'use client';

import { Layout, Typography, theme } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/app/components/PageHeader';
import PageFooter from '@/app/components/PageFooter';
import DownloadOptions from './DownloadOptions';
import DownloadForm from './DownloadForm';
import ThankyouResult from './ThankyouResult';
import { useDownloadForm } from './useDownloadForm';

const { Content } = Layout;
const { Title } = Typography;

export default function DownloadPageClient() {
  const {
    form, skip, setSkip, selected, setSelected, showThankYou,
    onFinish, handleDownload,
  } = useDownloadForm();

  const { token } = theme.useToken();

  const fadeVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <Layout style={{ minHeight: '100vh', background: token.colorBgLayout }}>
      <PageHeader />
      <Content style={{ maxWidth: 700, margin: '0 auto', padding: '3rem 1rem' }}>
        <div style={{
          backgroundColor: token.colorBgContainer,
          padding: '2rem',
          borderRadius: token.borderRadius,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          minHeight: 500,
        }}>
          <Title level={2} style={{ textAlign: 'center' }}>Select files to download</Title>
          <div style={{ textAlign: 'center' }}>
            <DownloadOptions selected={selected} setSelected={setSelected} />
          </div>

          <AnimatePresence mode="wait">
            {showThankYou ? (
              <motion.div key="success" variants={fadeVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
                <ThankyouResult selected={selected} handleDownload={handleDownload} />
              </motion.div>
            ) : (
              <motion.div key="form" variants={fadeVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
                <DownloadForm
                  form={form}
                  skip={skip}
                  setSkip={setSkip}
                  onFinish={onFinish}
                  selected={selected}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Content>
      <PageFooter />
    </Layout>
  );
}
