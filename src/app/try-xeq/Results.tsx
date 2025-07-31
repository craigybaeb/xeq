'use client';

import React, { useRef } from 'react';
import {
  Typography,
  Card,
  Row,
  Col,
  Button,
  Collapse,
  Tooltip
} from 'antd';
import {
  BulbOutlined,
  RocketOutlined,
  SmileOutlined,
  ThunderboltOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import BarChart from './BarChart';
import { useReactToPrint } from 'react-to-print';
import { Principle, ResultsProps } from './types';
import GroupedBarChart from './GroupedBarChart';
import stakeholders from '@/data/stakeholders';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

let itemIndex = 0;
const principles: Principle[] = [
  {
    key: 'Learning',
    title: 'Learning',
    description: 'The extent to which the experience develops knowledge or competence.',
    icon: <BulbOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />,
    color: '#e6f7ff',
    items: [],
  },
  {
    key: 'Utility',
    title: 'Utility',
    description: 'The contribution of the experience towards task completion.',
    icon: <RocketOutlined style={{ fontSize: '2rem', color: '#9254de' }} />,
    color: '#f9f0ff',
    items: [],
  },
  {
    key: 'Fulfilment',
    title: 'Fulfilment',
    description: 'The degree to which the experience supports the achievement of XAI goals.',
    icon: <SmileOutlined style={{ fontSize: '2rem', color: '#fa8c16' }} />,
    color: '#fff7e6',
    items: [],
  },
  {
    key: 'Engagement',
    title: 'Engagement',
    description: 'The quality of the interaction between the user and the XAI system.',
    icon: <ThunderboltOutlined style={{ fontSize: '2rem', color: '#52c41a' }} />,
    color: '#f6ffed',
    items: [],
  },
];

// Add individual items
const allItems: Record<string, string[]> = {
  Learning: [
    'The experience helped me understand the reliability of the AI system.',
    'The information presented during the experience was clear.',
    'The experience has improved my understanding of how the AI system works.',
    'The experience helped me build trust in the AI system.',
  ],
  Utility: [
    'I am confident about using the AI system.',
    'The experience helped me make more informed decisions.',
    'The information presented was personalised to the requirements of my role.',
    'The information presented was understandable within the requirements of my role.',
    'The experience helped to complete the intended task using the AI system.',
    'The information presented during the experience was sufficiently detailed.',
  ],
  Fulfilment: [
    'The experience was consistent with my expectations.',
    'The presentation of the experience was appropriate for my requirements.',
    'The information presented showed me that the AI system performs well.',
    'The experience provided answers to all of my explanation needs.',
    'The experience was satisfying.',
  ],
  Engagement: [
    'The explanations received throughout the experience were consistent.',
    'I received the explanations in a timely and efficient manner.',
    'The experience progressed sensibly.',
  ],
};

principles.forEach((principle) => {
  principle.items = allItems[principle.key].map((text) => ({
    key: `item_${itemIndex++}`,
    text,
  }));
});

const XEQResults: React.FC<ResultsProps> = ({ formData, onTryAnother, selectedExperience, stakeholder }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'XEQ_Results',
  });
  

  const systemAvg: number | null = (() => {
    const values = Object.entries(formData)
      .filter(([key]) => key.startsWith('item_'))
      .map(([, val]) => Number(val))
      .filter((v) => !isNaN(v));

    return values?.length > 0 ? values.reduce((a, b) => a + b, 0) / values?.length : null;
  })();

  const chartData: { name: string; score: number }[] = principles.map(({ title, items }) => {
    const scores = items.map(({ key }) => Number(formData?.[key]));
    const avg = scores?.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores?.length : 0;
    return { name: title, score: avg };
  });

  const getPrincipleFeedback = (name: string, score: number): string => {
    const templates: Record<string, string> = {
      Learning: 'The AI system scored {level} on Learning, suggesting that users {insight}.',
      Utility: 'Utility was rated {level}, indicating that users {insight}.',
      Fulfilment: 'The system achieved a {level} score in Fulfilment, which means that it {insight}.',
      Engagement: 'Engagement was {level}, suggesting that the interaction {insight}.',
    };

    let level = '';
    let insight = '';

    if (score <= 3) {
      level = 'low';
      insight = {
        Learning: 'may not find it helpful for developing competence or understanding',
        Utility: 'might not feel it supports their task completion well',
        Fulfilment: 'may not have had their explanation needs fully met',
        Engagement: 'might have found the experience inconsistent or disjointed',
      }[name]!;
    } else if (score < 4) {
      level = 'moderate';
      insight = {
        Learning: 'found some value but with room to better support understanding',
        Utility: 'felt partially supported in completing tasks',
        Fulfilment: 'felt somewhat fulfilled but possibly left with questions',
        Engagement: 'had a fairly smooth experience, but it could be improved',
      }[name]!;
    } else {
      level = 'high';
      insight = {
        Learning: 'found it useful for understanding and building trust',
        Utility: 'felt it clearly supported their goals and decision making',
        Fulfilment: 'had their expectations and explanation needs met',
        Engagement: 'experienced a smooth and coherent interaction',
      }[name]!;
    }

    return templates[name].replace('{level}', level).replace('{insight}', insight);
  };

  const discussionParagraphs: string[] = chartData.map(({ name, score }) =>
    getPrincipleFeedback(name, score)
  );

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <div ref={printRef}>
        <Title level={2} style={{ textAlign: 'center' }}>4. Your Results</Title>

        <Card style={{ marginBottom: '2rem', background: '#fafafa' }}>
          <Title level={4}>System XEQ Score</Title>
          {systemAvg !== null ? (
            <>
              <Paragraph style={{ fontSize: '1.1rem' }}>
                <strong>{systemAvg.toFixed(2)} out of 5</strong>{' '}
                <Tooltip title="As there are no baselines yet, we interpret scores below 3 as needing improvement. Scores above 3 suggest the AI system performs reasonably well.">
                  <InfoCircleOutlined style={{ color: '#888', fontSize: '1rem', cursor: 'pointer' }} />
                </Tooltip>
              </Paragraph>
              {discussionParagraphs.map((para, i) => (
                <Paragraph key={i}>{para}</Paragraph>
              ))}
            </>
          ) : (
            <Paragraph>N/A</Paragraph>
          )}
        </Card>

        {principles.map(({ key, title, icon, description, color, items }) => {
          const scores = items.map(({ key }) => Number(formData?.[key]));
          const avg = scores?.length > 0
            ? (scores.reduce((a, b) => a + b, 0) / scores?.length).toFixed(2)
            : 'N/A';

          return (
            <Card key={key} style={{ backgroundColor: color, marginBottom: '1.5rem' }}>
              <Row align="middle" gutter={16}>
                <Col>{icon}</Col>
                <Col flex="auto">
                  <Title level={4} style={{ marginBottom: 0 }}>{title} XEQ Score</Title>
                  <Paragraph style={{ marginBottom: 0 }}>{description}</Paragraph>
                </Col>
                <Col>
                  <Title level={4} style={{ margin: 0 }}>Average Score: {avg}</Title>
                </Col>
              </Row>

              <Collapse style={{ marginTop: '1rem' }}>
                <Panel header="View your responses" key={`panel-${key}`}>
                  <ul style={{ paddingLeft: '1rem' }}>
                    {items.map(({ key, text }) => {
                      const response = formData?.[key];
                      const labels = [
                        'Strongly Disagree',
                        'Disagree',
                        'Neutral',
                        'Agree',
                        'Strongly Agree',
                      ];
                      const responseLabel = labels[(Number(response) || 0) - 1] ?? 'N/A';

                      return (
                        <li key={key} style={{ marginBottom: '0.75rem' }}>
                          <div style={{ fontWeight: 500 }}><strong>{text}</strong></div>
                          <div style={{ marginLeft: '1rem', color: '#555' }}>
                            <span style={{ fontWeight: 600 }}>
                              {response ? `${response} – ${responseLabel}` : 'N/A'}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Panel>
              </Collapse>
            </Card>
          );
        })}

        <Card title="XEQ Scores by Dimension" style={{ marginTop: '2rem' }}>
  <Paragraph type="secondary" style={{ marginBottom: '1rem' }}>
    This chart displays your average ratings across the four explanation quality dimensions: Learning, Utility, Fulfilment, and Engagement. Use it to reflect on which aspects of the explanation experience were strongest, and where improvements may be needed to better support the stakeholder's goals.
  </Paragraph>
  <BarChart scores={chartData} />
</Card>


        {selectedExperience !== "custom" && stakeholder && (
  <Card
  title={
    <span>
      Grouped Scores by Stakeholder{' '}
      <Tooltip title={`Scores for stakeholders other than ${stakeholder} (which you selected) are AI-generated and may not reflect real evaluations.`}>
        <InfoCircleOutlined style={{ marginLeft: 8 }} />
      </Tooltip>
    </span>
  }
  style={{ marginTop: '2rem' }}
>
  <Paragraph type="secondary" style={{ marginBottom: '1rem' }}>
     This chart shows how each stakeholder scores the explanation experience across the four XEQ dimensions. Use it to identify where stakeholder needs are being well addressed or potentially overlooked. Large differences between stakeholders may indicate a need to further personalise explanations for different roles.
  </Paragraph>
  <GroupedBarChart
    scores={(() => {
      const experienceKey = selectedExperience as keyof typeof stakeholders;
      const stakeholderList = stakeholders[experienceKey] ?? [];

      return stakeholderList.map((s) =>
        s.stakeholder === stakeholder
          ? { stakeholder: s.stakeholder, values: chartData }
          : s
      );
    })()}
  />
</Card>

)}

      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Button type="primary" onClick={handlePrint} style={{ marginRight: '1rem' }}>
          Print Results to PDF
        </Button>
        {onTryAnother && (
          <Button onClick={onTryAnother}>
            Try a Different Experience
          </Button>
        )}
      </div>
    </div>
  );
};

export default XEQResults;
