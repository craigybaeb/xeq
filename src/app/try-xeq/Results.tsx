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
import { xeqFactors, XEQFactorKey } from '@/data/xeqScale';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const factorPresentation: Record<XEQFactorKey, { icon: React.ReactNode; color: string }> = {
  Utility: {
    icon: <RocketOutlined style={{ fontSize: '2rem', color: '#9254de' }} />,
    color: '#f9f0ff',
  },
  Satisfaction: {
    icon: <SmileOutlined style={{ fontSize: '2rem', color: '#fa8c16' }} />,
    color: '#fff7e6',
  },
  Effectiveness: {
    icon: <ThunderboltOutlined style={{ fontSize: '2rem', color: '#52c41a' }} />,
    color: '#f6ffed',
  },
};

const principles: Principle[] = xeqFactors.map((factor) => ({
  ...factor,
  ...factorPresentation[factor.key],
}));

const XEQResults: React.FC<ResultsProps> = ({ formData, onTryAnother, selectedExperience, stakeholder }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'XEQ_Results',
  });
  
  const formatList = (names: string[]): string => {
    if (names.length === 0) return '';
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} & ${names[1]}`;
  
    return `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`;
};

  const stakeholderAvg: number | null = (() => {
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
      Utility: `Utility was rated {level}, indicating that ${stakeholder.toLowerCase()}s {insight}.`,
      Satisfaction: 'Satisfaction was rated {level}, suggesting that the experience {insight}.',
      Effectiveness: 'Effectiveness was rated {level}, suggesting that the explanations {insight}.',
    };

    let level = '';
    let insight = '';

    if (score <= 3) {
      level = 'low';
      insight = {
        Utility: 'might not feel it supports their task completion well',
        Satisfaction: 'may not be meeting stakeholder expectations or explanation needs',
        Effectiveness: 'may not be clear, coherent, or detailed enough to support understanding',
      }[name]!;
    } else if (score < 4) {
      level = 'moderate';
      insight = {
        Utility: 'felt partially supported in completing tasks',
        Satisfaction: 'partly met expectations but may still leave some needs unmet',
        Effectiveness: 'provided some useful understanding but could be clearer or more complete',
      }[name]!;
    } else {
      level = 'high';
      insight = {
        Utility: 'felt it clearly supported their goals and decision making',
        Satisfaction: 'met stakeholder expectations and explanation needs well',
        Effectiveness: 'were coherent, clear, and useful for understanding the AI system',
      }[name]!;
    }

    return templates[name].replace('{level}', level).replace('{insight}', insight);
  };

  const discussionParagraphs: string[] = chartData.map(({ name, score }) =>
    getPrincipleFeedback(name, score)
  );

  const getStakeholderAverages = () => {
  const experienceKey = selectedExperience as keyof typeof stakeholders;
  const stakeholderList = stakeholders[experienceKey] ?? [];

  return stakeholderList.map((s) => {
    const values = s.stakeholder === stakeholder ? chartData : s.values;
    const avg = values.reduce((sum, { score }) => sum + score, 0) / values.length;
    return {
      stakeholder: s.stakeholder,
      average: avg,
    };
  });
};

const stakeholderAverages = getStakeholderAverages();


  const getSystemAverageScore = (): number | null => {
    const experienceKey = selectedExperience as keyof typeof stakeholders;
    const stakeholderList = stakeholders[experienceKey] ?? [];

    const allScores: number[] = [];

    stakeholderList.forEach((s) => {
      const values = s.stakeholder === stakeholder ? chartData : s.values;

      values.forEach(({ score }) => {
        if (!isNaN(score)) {
          allScores.push(score);
        }
      });
  });

  return allScores.length ? allScores.reduce((a, b) => a + b, 0) / allScores.length : null;
};


const systemXEQScore = getSystemAverageScore();


  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <div ref={printRef}>
        <Title level={2} style={{ textAlign: 'center' }}>4. Your Results</Title>

        <Card style={{ marginBottom: '2rem', background: '#fafafa' }}>
          <Title level={4}><strong>{stakeholder}</strong> Stakeholder XEQ Score</Title>
          {stakeholderAvg !== null ? (
            <>
              <Paragraph style={{ fontSize: '1.1rem' }}>
                <strong>{stakeholderAvg.toFixed(2)} out of 5</strong>{' '}
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
    This chart displays your average ratings across the three explanation quality factors: Utility, Satisfaction, and Effectiveness. Use it to reflect on which aspects of the explanation experience were strongest, and where improvements may be needed to better support the stakeholder&apos;s goals.
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
     This chart shows how each stakeholder scores the explanation experience across the three XEQ factors. Use it to identify where stakeholder needs are being well addressed or potentially overlooked. Large differences between stakeholders may indicate a need to further personalise explanations for different roles.
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

{selectedExperience !== "custom" && <Card title="System XEQ Score (All Stakeholders)" style={{ marginTop: '2rem' }}>
  <Paragraph style={{ fontSize: '1.1rem' }}>
    <strong>{systemXEQScore !== null ? `${systemXEQScore.toFixed(2)} out of 5` : 'N/A'}</strong> {' '}
                <Tooltip title="As there are no baselines yet, we interpret scores below 3 as needing improvement. Scores above 3 suggest the AI system performs reasonably well.">
                  <InfoCircleOutlined style={{ color: '#888', fontSize: '1rem', cursor: 'pointer' }} />
                </Tooltip>
</Paragraph>
<Paragraph style={{ marginTop: '1rem' }}>
  {(() => {
    const good = stakeholderAverages.filter(s => s.average >= 3.5).map(s => s.stakeholder);
    const neutral = stakeholderAverages.filter(s => s.average >= 2.5 && s.average < 3.5).map(s => s.stakeholder);
    const poor = stakeholderAverages.filter(s => s.average < 2.5).map(s => s.stakeholder);

    let text = '';

    if (good.length > 0) {
      text += `Stakeholders like ${formatList(good)} found the explanation experience effective and well-aligned with their needs. `;
    }

    if (neutral.length > 0) {
      text += `Roles such as ${formatList(neutral)} gave neutral ratings, suggesting moderate support with room for improvement. `;
    }

    if (poor.length > 0) {
      text += `The experience may need significant improvement for ${formatList(poor)}, who rated it low on average.`;
    }

    return text || 'Stakeholder feedback is mixed. Use the scores above to explore differences in experience quality.';
  })()}
</Paragraph>

</Card>}


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
