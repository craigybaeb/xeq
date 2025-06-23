'use client';

import React, { useRef } from 'react';
import { Typography, Card, Row, Col, Button } from 'antd';
import BarChart from './BarChart';
import RadarChart from './RadarChart';
import { useReactToPrint } from 'react-to-print';
import { BulbOutlined, RocketOutlined, SmileOutlined, ThunderboltOutlined } from '@ant-design/icons';
// import GaugeChart from './GaugeChart';

const { Title, Paragraph } = Typography;

type Props = {
  formData: Record<string, any>;
};

const principles = [
  {
    key: 'Learning',
    title: 'Learning',
    description: 'The extent to which the experience develops knowledge or competence.',
    icon: <BulbOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />,
    color: '#e6f7ff',
    items: [
      'The experience helped me understand the reliability of the AI system.',
      'The information presented during the experience was clear.',
      'The experience has improved my understanding of how the AI system works.',
      'The experience helped me build trust in the AI system.',
    ],
  },
  {
    key: 'Utility',
    title: 'Utility',
    description: 'The contribution of the experience towards task completion.',
    icon: <RocketOutlined style={{ fontSize: '2rem', color: '#9254de' }} />,
    color: '#f9f0ff',
    items: [
      'I am confident about using the AI system.',
      'The experience helped me make more informed decisions.',
      'The information presented was personalised to the requirements of my role.',
      'The information presented was understandable within the requirements of my role.',
      'The experience helped to complete the intended task using the AI system.',
      'The information presented during the experience was sufficiently detailed.',
    ],
  },
  {
    key: 'Fulfilment',
    title: 'Fulfilment',
    description: 'The degree to which the experience supports the achievement of XAI goals.',
    icon: <SmileOutlined style={{ fontSize: '2rem', color: '#fa8c16' }} />,
    color: '#fff7e6',
    items: [
      'The experience was consistent with my expectations.',
      'The presentation of the experience was appropriate for my requirements.',
      'The information presented showed me that the AI system performs well.',
      'The experience provided answers to all of my explanation needs.',
      'The experience was satisfying.',
    ],
  },
  {
    key: 'Engagement',
    title: 'Engagement',
    description: 'The quality of the interaction between the user and the XAI system.',
    icon: <ThunderboltOutlined style={{ fontSize: '2rem', color: '#52c41a' }} />,
    color: '#f6ffed',
    items: [
      'The explanations received throughout the experience were consistent.',
      'I received the explanations in a timely and efficient manner.',
      'The experience progressed sensibly.',
    ],
  },
];

const XEQResults: React.FC<Props> = ({ formData }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'XEQ_Results',
  });

  const systemAvg = (() => {
    const values = Object.values(formData || {}).map((val) => Number(val));
    return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : null;
  })();

  const chartData = principles.map(({ key, title, items }) => {
    const startIndex = principles
      .slice(0, principles.findIndex((p) => p.key === key))
      .reduce((acc, p) => acc + p.items.length, 0);
    const itemKeys = Object.keys(formData || {}).filter((k) => k.startsWith('item_'));
    const scores = itemKeys
      .slice(startIndex, startIndex + items.length)
      .map((k) => Number(formData[k]));
    const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

    return { name: title, score: avg };
  });

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <div ref={printRef}>
        <Title level={2} style={{ textAlign: 'center' }}>4. Your Results</Title>

        <Card style={{ marginBottom: '2rem', background: '#fafafa' }}>
          <Title level={4}>System XEQ Score</Title>
          {systemAvg !== null ? (
            <Paragraph style={{ fontSize: '1.1rem' }}>
              <strong>{systemAvg.toFixed(2)} out of 5</strong>
            </Paragraph>
          ) : (
            <Paragraph>N/A</Paragraph>
          )}
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {principles.map(({ key, title, icon, color, items, description }) => {
            const start = principles
              .slice(0, principles.findIndex((p) => p.key === key))
              .reduce((acc, p) => acc + p.items.length, 0);
            const scores = Object.keys(formData || {})
              .filter((k) => k.startsWith('item_'))
              .slice(start, start + items.length)
              .map((k) => Number(formData[k]));
            const avg = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : 'N/A';

            return (
              <Card key={key} style={{ backgroundColor: color }}>
                <Row align="middle" gutter={16}>
                  <Col>{icon}</Col>
                  <Col flex="auto">
                    <Title level={4} style={{ marginBottom: 0 }}>{title} XEQ Score</Title>
                    <Paragraph style={{ marginBottom: 0 }}>{description}</Paragraph>
                  </Col>
                  <Col>
                    <Title level={4} style={{ margin: 0 }}>{avg} / 5.00</Title>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </div>

        <Card title="XEQ Scores by Dimension" style={{ marginTop: '2rem' }}>
          <BarChart scores={chartData} />
        </Card>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Button type="primary" onClick={handlePrint}>
          Print Results to PDF
        </Button>
      </div>
    </div>
  );
};

export default XEQResults;
