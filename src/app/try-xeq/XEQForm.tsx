'use client';
import '@ant-design/v5-patch-for-react-19';

import React, { useState, useRef } from 'react';
import {
  Form,
  Typography,
  Button,
  Radio,
  Collapse,
  Row,
  Col,
  Card,
  Grid,
} from 'antd';
import {
  BulbOutlined,
  RocketOutlined,
  SmileOutlined,
  ThunderboltOutlined,
  ExclamationCircleTwoTone,
} from '@ant-design/icons';

const { Title } = Typography;
const { Panel } = Collapse;
const { useBreakpoint } = Grid;

const likertLabels = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
];

// ----------------------------
// Typings
// ----------------------------
type PrincipleItem = {
  key: string;
  text: string;
};

type Principle = {
  key: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  items: PrincipleItem[];
};

type XEQFormValues = Record<string, number>;

interface XEQFormProps {
  onSubmit?: (values: XEQFormValues) => void;
}

// ----------------------------
// Setup
// ----------------------------
let globalItemIndex = 0;

const principles: Principle[] = [
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
    ].map((text) => ({ key: `item_${globalItemIndex++}`, text })),
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
    ].map((text) => ({ key: `item_${globalItemIndex++}`, text })),
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
    ].map((text) => ({ key: `item_${globalItemIndex++}`, text })),
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
    ].map((text) => ({ key: `item_${globalItemIndex++}`, text })),
  },
];

// ----------------------------
// Component
// ----------------------------
const XEQForm: React.FC<XEQFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm<XEQFormValues>();
  const [errorDimensions, setErrorDimensions] = useState<Record<string, boolean>>({});
  const [activeKey, setActiveKey] = useState<string | string[]>();
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const dimensionMap: Record<string, string> = {};
  principles.forEach(({ key, items }) => {
    items.forEach(({ key: itemKey }) => {
      dimensionMap[itemKey] = key;
    });
  });

  const handleFinish = (values: XEQFormValues) => {
    setErrorDimensions({});
    onSubmit?.(values);
  };

  const handleFinishFailed = (errorInfo: {
    errorFields: { name: (string | number)[] }[];
  }) => {
    const missing: Record<string, boolean> = {};
    let firstMissingDimension: string | null = null;

    for (const err of errorInfo.errorFields) {
      const field = err.name[0] as string;
      const dimension = dimensionMap[field];
      if (dimension) {
        missing[dimension] = true;
        if (!firstMissingDimension) {
          firstMissingDimension = dimension;
        }
      }
    }

    setErrorDimensions(missing);

    if (firstMissingDimension) {
      setActiveKey(firstMissingDimension);
      setTimeout(() => {
        panelRefs.current[firstMissingDimension]?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '3rem auto', padding: isMobile ? '1rem 0.5rem' : '1rem' }}>
      <Title level={2} style={{ textAlign: 'center' }}>XEQ Scale Evaluation</Title>

      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        onValuesChange={(changed, allValues) => {
          const updatedErrors = { ...errorDimensions };
          principles.forEach(({ key, items }) => {
            const allAnswered = items.every(({ key: itemKey }) => allValues[itemKey] !== undefined);
            if (allAnswered && updatedErrors[key]) {
              delete updatedErrors[key];
            }
          });
          setErrorDimensions(updatedErrors);
        }}
      >
        <Collapse
          accordion
          bordered={false}
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
        >
          {principles.map(({ key, title, description, icon, color, items }) => (
            <Panel
              forceRender
              key={key}
              style={{ backgroundColor: color }}
              header={
                <div ref={(node) => { panelRefs.current[key] = node; }}>
  <Row
    align="middle"
    wrap
    style={{
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '0.5rem' : 0,
    }}
  >
    <Col>{icon}</Col>
    <Col flex="auto" style={{ marginLeft: isMobile ? 0 : '1rem', textAlign: isMobile ? 'center' : 'left' }}>
      <strong>{title}</strong>
      <div style={{ fontSize: '0.85rem', color: '#888' }}>{description}</div>
      {errorDimensions[key] && isMobile && (
        <div style={{ marginTop: '0.5rem' }}>
          <ExclamationCircleTwoTone twoToneColor="#ff4d4f" style={{ fontSize: '1.2rem' }} />
        </div>
      )}
    </Col>
    {!isMobile && errorDimensions[key] && (
      <Col>
        <ExclamationCircleTwoTone twoToneColor="#ff4d4f" style={{ fontSize: '1.5rem' }} />
      </Col>
    )}
  </Row>
</div>

              }
            >
              <Card variant='outlined' style={{ backgroundColor: 'transparent' }}>
                {items.map(({ key: itemKey, text }) => (
                  <Form.Item
                    key={itemKey}
                    name={itemKey}
                    label={`${Number(itemKey.split('_')[1]) + 1}. ${text}`}
                    rules={[{ required: true, message: 'Please select a response.' }]}
                    style={{ marginBottom: '1.5rem' }}
                  >
                    <Radio.Group
  optionType="button"
  buttonStyle="solid"
  style={{
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '0.5rem' : undefined,
    flexWrap: isMobile ? 'nowrap' : 'wrap',
  }}
>
  {likertLabels.map((label, idx) => (
    <Radio.Button
      key={label}
      value={idx + 1}
      style={{
        whiteSpace: 'normal', 
        textAlign: 'center',
        flex: isMobile ? '1 0 auto' : '1',
        borderRadius: isMobile ? 0 : undefined,
        width: isMobile ? '100%' : '180px', 
        minHeight: '48px', 
        padding: '0.5rem', 
        wordBreak: 'break-word', 
        border: isMobile ? '1px solid #d9d9d9' : undefined,
      }}
    >
  
      {label}
    </Radio.Button>
  ))}
</Radio.Group>

                  </Form.Item>
                ))}
              </Card>
            </Panel>
          ))}
        </Collapse>

        <Form.Item style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Button type="primary" htmlType="submit">
            Submit Responses
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default XEQForm;
