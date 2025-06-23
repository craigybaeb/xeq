// EventBanner.tsx
import { Alert } from 'antd';

const EventBanner = ({ title, description, link }: { title: string; description: string; link?: string }) => (
  <Alert
    message={title}
    description={<span>{description} {link && <a href={link}>Learn more</a>}</span>}
    type="info"
    banner
    closable
    style={{ fontSize: '1rem' }}
  />
);

export default EventBanner;
