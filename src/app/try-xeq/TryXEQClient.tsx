// app/try-xeq/TryXEQPage.client.tsx
'use client';

import React, { useState } from 'react';
import { Layout, Typography, Steps, Button, Card, Collapse, Row, Col, Image, message } from 'antd';
import {
  MedicineBoxOutlined,
  CreditCardOutlined,
  ThunderboltOutlined,
  SmileOutlined,
  RocketOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import PageHeader from '@/app/components/pageHeader';
import PageFooter from '@/app/components/pageFooter';
import XEQForm from '@/app/components/XEQForm';
import Results from '@/app/components/Results';
import { AnimatePresence, motion } from 'framer-motion';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Step } = Steps;
const { Panel } = Collapse;

type Experience = {
  id: string;
  name: string;
  description: string;
  image?: string; // keep for compatibility
  images?: string[];
  icon: React.ReactNode;
};


type Principle = {
  key: string;
  title: string;
  description: string;
  items: string[];
};

type Props = {
  experiences: Experience[];
  principles: Principle[];
};

export default function TryXEQClient({ experiences, principles }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<any>(null);

  const next = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleFormSubmit = (values: any) => {
    setFormData(values);
    message.success('Form submitted!');
    setCurrentStep(3);
  };

  const steps = [
    {
      title: 'Select Experience',
      content: (
        <>
          <Title level={2}>1. Select an Explanation Experience</Title>
          <Paragraph>
            Choose the AI explanation experience you would like to evaluate using the XEQ scale.
          </Paragraph>
          <Row gutter={[24, 24]} justify="center">
  {experiences.map((exp) => (
    <Col xs={24} sm={12} md={8} key={exp.id} style={{ display: 'flex' }}>
      <Card
        hoverable
        onClick={() => {
          setSelectedExperience(exp);
          next();
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Card.Meta
          title={
            <span>
              {exp.icon} <span style={{ marginLeft: '0.5rem' }}>{exp.name}</span>
            </span>
          }
          description={exp.description}
        />
      </Card>
    </Col>
  ))}
</Row>

        </>
      ),
    },
    {
      title: 'Information',
      content: (
        <>
          <Title level={2}>2. About the Explanation Experience</Title>
          <Paragraph>
            You selected: <strong>{selectedExperience?.name}</strong>
          </Paragraph>
          <Paragraph>
            Below we present an example of a user interacting with an AI system. Review this example and try to imagine that you are the user in question. Provide feedback on the AI system using the XEQ scale on the following page.
          </Paragraph>
    
          {selectedExperience?.images?.length ? (
            <Row gutter={[16, 16]} style={{ marginTop: '1rem' }}>
              {selectedExperience.images.map((img, idx) => (
                <Col xs={24} sm={12} md={8} key={idx}>
                  <Image
                    src={img}
                    alt={`${selectedExperience.name} example ${idx + 1}`}
                    style={{ width: '100%', borderRadius: 8, objectFit: 'cover' }}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <Paragraph style={{ marginTop: '1rem' }}>No example images available for this experience.</Paragraph>
          )}
    
          {/* <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button type="primary" onClick={next}>
              Continue to Scale
            </Button>
          </div> */}
        </>
      ),
    }
,    
    {
      title: 'XEQ Scale',
      content: (
        <>
          <Collapse ghost style={{ marginBottom: '2rem' }}>
            <Panel header="View Explanation Experience" key="1">
            {selectedExperience?.images?.length ? (
  <Row gutter={[16, 16]}>
    {selectedExperience.images.map((img, idx) => (
      <Col xs={24} sm={12} md={8} key={idx}>
        <Image
          src={img}
          alt={`Example ${idx + 1}`}
          style={{ width: '100%', borderRadius: 8, maxHeight: 400, objectFit: 'cover' }}
        />
      </Col>
    ))}
  </Row>
) : (
  <Paragraph>No example images provided.</Paragraph>
)}

              <Paragraph>{selectedExperience?.description}</Paragraph>
            </Panel>
          </Collapse>

          <Card>
            <Title level={3} style={{ textAlign: 'center' }}>
              3. Complete the XEQ Scale
            </Title>
            <Paragraph style={{ textAlign: 'center' }}>
              Rate the statements based on your selected experience.
            </Paragraph>
            <XEQForm onSubmit={handleFormSubmit} />
          </Card>
        </>
      ),
    },
    {
      title: 'Results',
      content: <Results formData={formData} />
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <PageHeader />
      <Content
  style={{
    maxWidth: 1100,
    width: '100%',
    minWidth: 800, // 👈 key fix: reserves enough width from the start
    margin: '0 auto',
    padding: '3rem 1rem',
  }}
>

        <Steps current={currentStep} style={{ marginBottom: '2rem' }}>
          {steps.map((step) => (
            <Step key={step.title} title={step.title} />
          ))}
        </Steps>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: '2rem' }}
          >
            {steps[currentStep].content}
          </motion.div>
        </AnimatePresence>

        <div style={{ textAlign: 'center' }}>
          {currentStep > 0 && currentStep < 3 && (
            <Button onClick={prev} style={{ marginRight: 8 }}>
              Back
            </Button>
          )}
          {currentStep < 2 && (
            <Button type="primary" onClick={next} disabled={currentStep === 0 && !selectedExperience}>
              Next
            </Button>
          )}
        </div>
      </Content>
      <PageFooter />
    </Layout>
  );
}
