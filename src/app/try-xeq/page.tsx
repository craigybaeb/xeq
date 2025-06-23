// app/try-xeq/TryXEQPage.server.tsx
import React from 'react';
import { Metadata } from 'next';
import TryXEQClient from './TryXEQClient';
import { BookOutlined, CreditCardOutlined, MedicineBoxOutlined } from '@ant-design/icons';

export const metadata: Metadata = {
  title: 'Try the XEQ Scale',
  description: 'Evaluate AI explanations using the XEQ scale.',
  openGraph: {
    title: 'Try the XEQ Scale',
    description: 'Evaluate AI explanations using the XEQ scale.',
    url: 'https://your-site.com/try-xeq',
    siteName: 'XEQ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Try the XEQ Scale',
    description: 'Evaluate AI explanations using the XEQ scale.',
  },
};

const experiences = [
  {
    id: 'exp1',
    name: 'Credit Risk Explanation',
    description: 'Explaining why a loan was denied by an autonomous credit risk assessment system.',
    icon: <CreditCardOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />,
    images: [
      '/assets/ExampleUseCases/AssistHub/Compliancy-1-1.png',
      '/assets/ExampleUseCases/AssistHub/Compliancy-1-2.png',
      '/assets/ExampleUseCases/AssistHub/Compliancy-1-3.png',
      '/assets/ExampleUseCases/AssistHub/Compliancy-1-4.png',
      '/assets/ExampleUseCases/AssistHub/Compliancy-1-5.png',
      '/assets/ExampleUseCases/AssistHub/Compliancy-1-6.png',
    ],
  },
  {
    id: 'exp2',
    name: 'Fracture Diagnosis Explanation',
    description: 'Explaining a fracture diagnosis made by a computer vision system.',
    icon: <MedicineBoxOutlined style={{ fontSize: '2rem', color: '#eb2f96' }} />,
    images: [
      '/assets/ExampleUseCases/RadioAssist/Compliancy-2-1.png',
      '/assets/ExampleUseCases/RadioAssist/Compliancy-2-2.png',
      '/assets/ExampleUseCases/RadioAssist/Compliancy-2-3.png',
    ],
  },
  {
    id: 'exp3',
    name: 'Course Assistant Explanation',
    description: 'Explaining how a conversational AI course assistant made recommendations for students.',
    icon: <BookOutlined style={{ fontSize: '2rem', color: '#722ed1' }} />,
    images: [
      '/assets/ExampleUseCases/CourseAssist/Compliancy-3-1.png',
      '/assets/ExampleUseCases/CourseAssist/Compliancy-3-2.png',
      '/assets/ExampleUseCases/CourseAssist/Compliancy-3-3.png',
    ],
  },
];

const principles = [
  {
    key: 'Learning',
    title: 'Learning',
    description: 'The extent to which the experience develops knowledge or competence.',
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
    items: [
      'The explanations received throughout the experience were consistent.',
      'I received the explanations in a timely and efficient manner.',
      'The experience progressed sensibly.',
    ],
  },
];

export default function TryXEQPage() {
  return <TryXEQClient experiences={experiences} principles={principles} />;
}
