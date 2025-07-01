'use client';

import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Steps,
  Button,
  Card,
  Collapse,
  Row,
  Col,
  Image as AntImage,
  message,
} from 'antd';
import type { ReactNode } from 'react';
import PageHeader from '@/app/components/PageHeader';
import PageFooter from '@/app/components/PageFooter';
import XEQForm from '@/app/try-xeq/XEQForm';
import Results from '@/app/try-xeq/Results';
import { AnimatePresence, motion } from 'framer-motion';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Step } = Steps;
const { Panel } = Collapse;

type Experience = {
  id: string;
  name: string;
  description: string;
  image?: string;
  images?: string[];
  icon: ReactNode;
};

type Props = {
  experiences: Experience[];
  customExperience?: Experience;
};

type FormValues = Record<string, number>;

const hasImages = (exp: Experience | null): exp is Experience & { images: string[] } =>
  Array.isArray(exp?.images) && exp.images.length > 0;

const TryXEQClient: React.FC<Props> = ({ experiences, customExperience }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const next = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleFormSubmit = (values: FormValues) => {
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

          <Row gutter={[16, 16]} justify="center">
            {experiences.map((exp) => (
              <Col xs={24} sm={12} md={8} key={exp.id}>
                <Card
                  hoverable
                  onClick={() => {
                    setSelectedExperience(exp);
                    next();
                  }}
                >
                  <Card.Meta
                    title={
                      <span>
                        {exp.icon}
                        <span style={{ marginLeft: '0.5rem' }}>{exp.name}</span>
                      </span>
                    }
                    description={exp.description}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          {customExperience && (
            <>
              <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <Title level={4}>Or test it on your own explanation experience</Title>
              </div>
              <Row gutter={[16, 16]} justify="center" style={{ marginTop: '1rem' }}>
                <Col xs={24} sm={12} md={8}>
                  <Card
                    hoverable
                    onClick={() => {
                      setSelectedExperience(customExperience);
                      next();
                    }}
                    style={{
                      border: '2px dashed #52c41a',
                      background: '#f6ffed',
                    }}
                  >
                    <Card.Meta
                      title={
                        <span>
                          {customExperience.icon}
                          <span style={{ marginLeft: '0.5rem' }}>{customExperience.name}</span>
                        </span>
                      }
                      description={customExperience.description}
                    />
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </>
      ),
    },
    {
      title: 'Information',
      content: selectedExperience && (
        <>
          <Title level={2}>2. About the Explanation Experience</Title>
          <Paragraph>
            You selected: <strong>{selectedExperience.name}</strong>
          </Paragraph>

          {selectedExperience.id === 'custom' ? (
            <>
              <Paragraph>
                You’ve chosen to evaluate your own explanation experience. In the next step, you’ll
                be shown a series of statements regarding the quality of the explanation. You’ll
                rate how much you agree from 1–5.
              </Paragraph>
              <Paragraph>
                To help you evaluate your system, please retrieve a real example explanation from
                your AI system — such as a prediction result, visualisation, or output. It will help
                to have it in front of you while answering.
              </Paragraph>
            </>
          ) : (
            <>
              <Paragraph>
                Below we present an example of a user interacting with an AI system. Review this
                example and try to imagine that you are the user in question. Provide feedback on
                the AI system using the XEQ scale on the following page.
              </Paragraph>

              {hasImages(selectedExperience) && (
                <Row gutter={[16, 16]} style={{ marginTop: '1rem' }}>
                  {selectedExperience.images.map((img, idx) => (
                    <Col xs={24} sm={12} md={8} key={idx}>
                      <AntImage
                        src={img}
                        alt={`${selectedExperience.name} example ${idx + 1}`}
                        style={{
                          width: '100%',
                          borderRadius: 8,
                          objectFit: 'cover',
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}
        </>
      ),
    },
    {
      title: 'XEQ Scale',
      content: selectedExperience && (
        <>
          <Collapse ghost style={{ marginBottom: '2rem' }}>
            <Panel header="View Explanation Experience" key="1">
              {selectedExperience.id !== 'custom' && hasImages(selectedExperience) && (
                <Row gutter={[16, 16]}>
                  {selectedExperience.images.map((img, idx) => (
                    <Col xs={24} sm={12} md={8} key={idx}>
                      <AntImage
                        src={img}
                        alt={`Example ${idx + 1}`}
                        style={{
                          width: '100%',
                          borderRadius: 8,
                          maxHeight: 400,
                          objectFit: 'cover',
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              )}
              {selectedExperience.description && (
                <Paragraph>{selectedExperience.description}</Paragraph>
              )}
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
      content: formData ? <Results formData={formData} /> : null,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <PageHeader />
      <Content
        style={{
          maxWidth: 1100,
          width: '100%',
          margin: '0 auto',
          padding: '2rem 1rem',
        }}
      >
        <Steps current={currentStep} responsive direction="horizontal" style={{ marginBottom: '2rem' }}>
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
            <Button
              type="primary"
              onClick={next}
              disabled={currentStep === 0 && !selectedExperience}
            >
              Next
            </Button>
          )}
        </div>
      </Content>
      <PageFooter />
    </Layout>
  );
};

export default TryXEQClient;
