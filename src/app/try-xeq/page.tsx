import React from 'react';
import { Metadata } from 'next';
import TryXEQClient from './TryXEQClient';
import {
  BookOutlined,
  CreditCardOutlined,
  MedicineBoxOutlined,
  UserOutlined,
} from '@ant-design/icons';

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

const predefinedExperiences = [
  {
    id: 'credit-risk',
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
    ]
  },
  {
    id: 'fracture-diagnosis',
    name: 'Fracture Diagnosis Explanation',
    description: 'Explaining a fracture diagnosis made by a computer vision system.',
    icon: <MedicineBoxOutlined style={{ fontSize: '2rem', color: '#eb2f96' }} />,
    images: [
      '/assets/ExampleUseCases/RadioAssist/Compliancy-2-1.png',
      '/assets/ExampleUseCases/RadioAssist/Compliancy-2-2.png',
      '/assets/ExampleUseCases/RadioAssist/Compliancy-2-3.png',
    ]
  },
  {
    id: 'course-assistant',
    name: 'Course Assistant Explanation',
    description: 'Explaining how a conversational AI course assistant made recommendations for students.',
    icon: <BookOutlined style={{ fontSize: '2rem', color: '#722ed1' }} />,
    images: [
      '/assets/ExampleUseCases/CourseAssist/Compliancy-3-1.png',
      '/assets/ExampleUseCases/CourseAssist/Compliancy-3-2.png',
      '/assets/ExampleUseCases/CourseAssist/Compliancy-3-3.png',
    ]
  },
];

const customExperience = {
  id: 'custom',
  name: 'Your Own Explanation Experience',
  description: 'Test the XEQ scale using your own AI explanation experience.',
  icon: <UserOutlined style={{ fontSize: '2rem', color: '#52c41a' }} />,
  images: [], // could lead to a blank state or upload page later
  isCustom: true,
};

export default function TryXEQPage() {
  return (
    <TryXEQClient
      experiences={predefinedExperiences}
      customExperience={customExperience}
    />
  );
}
