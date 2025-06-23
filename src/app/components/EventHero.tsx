// EventHero.tsx
import { Card, Button, Typography } from 'antd';
import Countdown from 'antd/es/statistic/Countdown';

const { Title, Paragraph } = Typography;
const deadline = new Date('2025-06-10T18:00:00Z').getTime();

const EventHero = () => (
  <Card
    style={{
      background: '#f0f5ff',
      border: '1px solid #91d5ff',
      textAlign: 'center',
      padding: '2rem',
    }}
  >
    <Title level={2}>🎤 Live Event: XEQ in Practice</Title>
    <Paragraph>Join our expert panel as they discuss real-world applications of the XEQ scale.</Paragraph>
    <Countdown title="Event starts in" value={deadline} />
    <Button type="primary" size="large" style={{ marginTop: '1rem' }} href="/events/xeq-live">
      Register Now
    </Button>
  </Card>
);

export default EventHero;
