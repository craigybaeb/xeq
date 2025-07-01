// app/download/page.tsx
import DownloadPageClient from './DownloadPageClient';

export const metadata = {
  title: 'XEQ | Download XEQ Scale',
  description: 'Download the XEQ questionnaire, handbook, and data sheet.',
};

export default function DownloadPage() {
  return <DownloadPageClient />;
}
