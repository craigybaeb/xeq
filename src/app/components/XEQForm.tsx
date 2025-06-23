'use client';

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

const likertLabels = [
  'Strongly Disagree',
  'Disagree',
  'Neutral',
  'Agree',
  'Strongly Agree',
];

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

type Props = {
  onSubmit?: (values: any) => void;
};

const XEQForm: React.FC<Props> = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [errorDimensions, setErrorDimensions] = useState<Record<string, boolean>>({});
  const [activeKey, setActiveKey] = useState<string | string[]>();
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  let itemIndex = 0;
  const dimensionMap: Record<string, string> = {};

  // Map item index to dimension key
  principles.forEach(({ key, items }) => {
    for (let i = 0; i < items.length; i++) {
      dimensionMap[`item_${itemIndex + 1}`] = key;
      itemIndex++;
    }
  });

  const onFinish = (values: any) => {
    setErrorDimensions({});
    onSubmit?.(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    const missing: Record<string, boolean> = {};
    let firstMissingDimension: string | null = null;
  
    for (const err of errorInfo.errorFields) {
      const field = err.name[0];
      const dimension = dimensionMap[field];
      if (dimension) {
        missing[dimension] = true;
        if (!firstMissingDimension) {
          firstMissingDimension = dimension;
        }
      }
    }
  
    setErrorDimensions(missing);
  
    // Open the first missing dimension
    if (firstMissingDimension) {
      setActiveKey(firstMissingDimension);
    }

    if (firstMissingDimension) {
      setActiveKey(firstMissingDimension);
      setTimeout(() => {
        panelRefs.current[firstMissingDimension]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
    
  };
  

  itemIndex = 0; // reset for rendering

  return (
    <div style={{ maxWidth: 800, margin: '3rem auto', padding: '1rem' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        XEQ Scale Evaluation
      </Title>

      <Form
  layout="vertical"
  form={form}
  onFinish={onFinish}
  onFinishFailed={onFinishFailed}
  onValuesChange={(changed, allValues) => {
    const updatedErrors = { ...errorDimensions };

    principles.forEach(({ key, items }) => {
      const dimensionOffset = principles
        .slice(0, principles.findIndex((p) => p.key === key))
        .reduce((acc, p) => acc + p.items.length, 0);

      const itemNames = items.map((_, idx) => `item_${dimensionOffset + idx + 1}`);

      const allAnswered = itemNames.every((name) => allValues[name] !== undefined);
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
                <div ref={(node) => (panelRefs.current[key] = node)}>
                <Row align="middle" style={{ width: '100%' }}>
                  <Col>{icon}</Col>
                  <Col flex="auto" style={{ marginLeft: '1rem' }}>
                    <strong>{title}</strong>
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>{description}</div>
                  </Col>
                  {errorDimensions[key] && (
                    <Col>
                      <ExclamationCircleTwoTone twoToneColor="#ff4d4f" style={{ fontSize: '1.5rem' }} />
                    </Col>
                  )}
                </Row>
                </div>
              }
            >
              <Card bordered={false} style={{ backgroundColor: 'transparent' }}>
                {items.map((question) => {
                  itemIndex += 1;
                  return (
                    <Form.Item
                      key={`item_${itemIndex}`}
                      name={`item_${itemIndex}`}
                      label={`${itemIndex}. ${question}`}
                      rules={[{ required: true, message: 'Please select a response.' }]}
                      style={{ marginBottom: '1.5rem' }}
                    >
                      <Radio.Group optionType="button" buttonStyle="solid">
                        {likertLabels.map((label, idx) => (
                          <Radio.Button key={label} value={idx + 1} style={{ marginBottom: '0.5rem' }}>
                            {label}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  );
                })}
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
