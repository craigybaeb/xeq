'use client';

import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
  theme,
  Result,
  Space,
} from 'antd';
import {
  FileTextOutlined,
  BookOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from './pageHeader';
import PageFooter from './pageFooter';
import Citation from './Citation';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const downloadOptions = [
  {
    key: 'questionnaire',
    label: 'Questionnaire',
    icon: <FileTextOutlined style={{ fontSize: 24 }} />,
    file: '/assets/xeq_scale.pdf',
  },
  {
    key: 'handbook',
    label: 'Handbook',
    icon: <BookOutlined style={{ fontSize: 24 }} />,
    file: '/assets/xeq_handbook.pdf',
  },
  {
    key: 'sheet',
    label: 'Data Sheet',
    icon: <TableOutlined style={{ fontSize: 24 }} />,
    file: '/assets/xeq_data_sheet.xlsx',
  },
];

const formatLabelList = (labels: string[]) => {
  if (labels.length === 0) return;
  if (labels.length === 1) return labels[0];
  const last = labels.pop();
  return `${labels.join(', ')} and ${last}`;
};

const DownloadPage: React.FC = () => {
  const [form] = Form.useForm();
  const [skip, setSkip] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { token } = theme.useToken();

  const handleDownload = (keyList: string[]) => {
    keyList.forEach((key) => {
      const target = downloadOptions.find((d) => d.key === key);
      if (!target) return;
      const link = document.createElement('a');
      link.href = target.file;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const onFinish = (values: any) => {
    console.log(`Form submission for:`, selected, values);
    handleDownload(selected);
    form.resetFields();
    setShowThankYou(true);
  };

  const fadeVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <Layout style={{ minHeight: '100vh', background: token.colorBgLayout }}>
      <PageHeader />
      <Content
        style={{ maxWidth: 700, margin: '0 auto', padding: '3rem 1rem', flex: '1 0 auto' }}
      >
        <div
          style={{
            backgroundColor: token.colorBgContainer,
            padding: '2rem',
            borderRadius: token.borderRadius,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            minHeight: 500,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>Select files to download</Title>
            <Space size="large" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
              {downloadOptions.map(({ key, label, icon }) => (
                <div key={key} style={{ textAlign: 'center' }}>
                  <Button
                    shape="circle"
                    size="large"
                    icon={icon}
                    onClick={() =>
                      setSelected((prev) =>
                        prev.includes(key)
                          ? prev.filter((k) => k !== key)
                          : [...prev, key]
                      )
                    }
                    type={selected.includes(key) ? 'primary' : 'default'}
                    style={{ width: 60, height: 60 }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <Text>{label}</Text>
                  </div>
                </div>
              ))}
            </Space>
          </div>

          <AnimatePresence mode="wait">
            {showThankYou ? (
              <motion.div
                key="success"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <Result
                  status="success"
                  title="Thank you!"
                  subTitle={`Your download${selected.length > 1 ? 's have' : ' has'} started.`}
                  extra={[
                    <Button
                      type="primary"
                      onClick={() => handleDownload(selected)}
                      key="download"
                    >
                      Re-download {formatLabelList([...selected])}
                    </Button>,
                    <Citation key="citation" />,
                  ]}
                />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                variants={fadeVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <Title level={2} style={{ textAlign: 'center', color: token.colorTextBase }}>
                  Access your download{selected.length > 1 ? 's' : ''}
                </Title>

                <Form
  form={form}
  layout="vertical"
  onFinish={onFinish}
  requiredMark={!skip}  // Only show "(optional)" when not skipped
  style={{ marginTop: '2rem' }}
>

                  <div aria-disabled={skip}>
  <Form.Item
    name="email"
    label="Email"
    rules={[{ required: !skip, type: 'email' }]}
  >
    <Input placeholder="e.g., yourname@example.com" disabled={skip} />
  </Form.Item>
  <Form.Item
    name="jobRole"
    label="Job Role"
    rules={[{ required: !skip }]}
  >
    <Input placeholder="e.g., Researcher" disabled={skip} />
  </Form.Item>
  <Form.Item
    name="industry"
    label="Industry"
    rules={[{ required: !skip }]}
  >
    <Input placeholder="e.g., Finance, Education" disabled={skip} />
  </Form.Item>
</div>


                  <Form.Item
                    name="agree"
                    valuePropName="checked"
                    rules={[{
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(new Error('You must agree to the license.')),
                    }]}
                  >
                    <Checkbox>
  By checking this box, I understand the terms of the{' '}
  <a href="/license" target="_blank" rel="noopener noreferrer">
    Creative Commons license
  </a>.
</Checkbox>

                  </Form.Item>

                  <Form.Item name="skip" valuePropName="checked">
                    <Checkbox onChange={(e) => setSkip(e.target.checked)}>
                      I’ve already submitted my details
                    </Checkbox>
                  </Form.Item>

                  <Form.Item style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={selected.length === 0}
                    >
                      Download {formatLabelList([...selected])}
                    </Button>
                  </Form.Item>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Content>
      <PageFooter />
    </Layout>
  );
};

export default DownloadPage;
