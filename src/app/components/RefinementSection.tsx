import { Layout, Typography, Card, Space } from 'antd';
import {
  BugOutlined,
  ToolOutlined,
  SmileOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';

const { Paragraph, Text, Title } = Typography;

const RefinementSection: React.FC = () => {
  return (
    <Card
      style={{
        marginTop: '3rem',
        padding: '2rem',
        background: '#ffffff',
        borderRadius: 16,
        border: '1px solid #f0f0f0',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
        textAlign: 'center',
      }}
    >
      <Space
        direction="vertical"
        size="large"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Title level={4} style={{ marginBottom: 0 }}>
          Improving the AI Experience
        </Title>

        <Paragraph style={{ fontSize: '1rem', maxWidth: 700 }}>
          Collecting XEQ scores from users allows AI system designers to detect areas for improvement,
          leading to more refined, trustworthy, and useful AI experiences.
        </Paragraph>

        <Space
          size="large"
          wrap
          style={{ justifyContent: 'center', marginTop: '1rem' }}
        >
          <Space direction="vertical" align="center">
            <BugOutlined style={{ fontSize: '2rem', color: '#cf1322' }} />
            <Text>Identify Issues</Text>
          </Space>

          <Space direction="vertical" align="center">
            <ToolOutlined style={{ fontSize: '2rem', color: '#faad14' }} />
            <Text>Refine Interactions</Text>
          </Space>

          <Space direction="vertical" align="center">
            <SafetyCertificateOutlined style={{ fontSize: '2rem', color: '#52c41a' }} />
            <Text>Build Trust</Text>
          </Space>

          <Space direction="vertical" align="center">
            <SmileOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
            <Text>Align with Users</Text>
          </Space>
        </Space>
      </Space>
    </Card>
  );
};

export default RefinementSection;
