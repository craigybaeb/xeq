'use client';

import React, { useState, useEffect } from 'react';
import {
  Layout,
  Typography,
  Steps,
  Button,
  Card,
  Collapse,
  Row,
  Col,
  Input,
  Select,
  Image as AntImage,
} from 'antd';
import PageHeader from '@/app/components/PageHeader';
import PageFooter from '@/app/components/PageFooter';
import XEQForm from '@/app/try-xeq/XEQForm';
import Results from '@/app/try-xeq/Results';
import { AnimatePresence, motion } from 'framer-motion';
import { Experience, ExperienceProps, FormSubmission, FormValues } from './types';
import styles from './styles.module.css';
import stakeholders from '@/data/stakeholders';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Step } = Steps;
const { Panel } = Collapse;

const TryXEQClient: React.FC<ExperienceProps> = ({ experiences, customExperience }) => {
  const EMPTY_EXPERIENCE: Experience = {
    id: '',
    name: '',
    description: '',
    icon: null,
    images: [],
    stakeholder: '',
  };

  

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedExperience, setSelectedExperience] = useState<Experience>(EMPTY_EXPERIENCE);
  const [formData, setFormData] = useState<FormSubmission | null>(null);
  const [stakeholder, setStakeholder] = useState<string>('');

  const stakeholderOptions = stakeholders[selectedExperience.id as keyof typeof stakeholders]?.map((s) => ({
  label: s.stakeholder,
  value: s.stakeholder,
})) || [];


  const next = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleStepChange = (value: number) => {
    if (value < currentStep || (value === 4 && formData)) {
      setCurrentStep(value);
    }
  };

  const handleFormSubmit = (values: FormValues) => {
    setFormData({
      ...values,
      stakeholder: selectedExperience.id === 'custom' ? stakeholder : (selectedExperience.stakeholder ?? ''),
      experienceId: selectedExperience.id,
      experienceName: selectedExperience.name,
    });
    setCurrentStep(4);
  };

  const reset = () => {
    setFormData(null);
    setSelectedExperience(EMPTY_EXPERIENCE);
    setStakeholder('');
    setCurrentStep(0);
  };

  useEffect(() => {
    if (selectedExperience && !Array.isArray(selectedExperience.images)) {
      console.warn('⚠️ Missing or invalid images on selectedExperience:', selectedExperience);
    }
  }, [selectedExperience]);

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
                    setSelectedExperience({
                      ...exp,
                      images: Array.isArray(exp.images) ? exp.images : [],
                    });
                    next();
                  }}
                >
                  <Card.Meta
                    title={
                      <span>
                        {exp.icon}
                        <span className={styles.experienceTitle}>{exp.name}</span>
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
              <div className={styles.customTitle}>
                <Title level={4}>Or test it on your own explanation experience</Title>
              </div>
              <Row gutter={[16, 16]} justify="center" className={styles.customCardRow}>
                <Col xs={24} sm={12} md={8}>
                  <Card
                    hoverable
                    onClick={() => {
                      setSelectedExperience({
                        ...customExperience,
                        images: Array.isArray(customExperience.images)
                          ? customExperience.images
                          : [],
                      });
                      next();
                    }}
                    className={styles.customCard}
                  >
                    <Card.Meta
                      title={
                        <span>
                          {customExperience.icon}
                          <span className={styles.experienceTitle}>{customExperience.name}</span>
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
      title: 'Stakeholder',
      content: selectedExperience && (
        <>
          <Title level={2}>2. Stakeholder Role</Title>
          {selectedExperience.id === 'custom' ? (
            <>
              <Paragraph>
                You’ve chosen to evaluate a custom explanation experience. Please specify the role
                or stakeholder you’re evaluating from.
              </Paragraph>
              <Input
                placeholder="e.g., Doctor, Driver, Analyst"
                value={stakeholder}
                onChange={(e) => setStakeholder(e.target.value)}
                style={{ maxWidth: 400 }}
              />
            </>
          ) : (
            <>
            <Paragraph>
              In this experience, you are acting as a <strong>{selectedExperience.stakeholder}</strong>.
            </Paragraph>
            <Select
              placeholder="Select your stakeholder role"
              style={{ width: '100%', marginBottom: '1rem' }}
              value={stakeholder}
              onChange={setStakeholder}
              options={stakeholderOptions}
            />
            </>
          )}
        </>
      ),
    },
    {
      title: 'Information',
      content: selectedExperience && (
        <>
          <Title level={2}>3. About the Explanation Experience</Title>
          <Paragraph>
            You selected: <strong>{selectedExperience.name}</strong>
          </Paragraph>

          {selectedExperience.id === 'custom' ? (
            <>
              <Paragraph>
                To help you evaluate your system, retrieve a real explanation output such as a visualisation
                or prediction from your AI system.
              </Paragraph>
            </>
          ) : (
            <>
              <Paragraph>
                Below we present an example of a user interacting with an AI system. Imagine you are the user and
                evaluate the experience from that perspective.
              </Paragraph>
              {Array.isArray(selectedExperience.images) && (
                <Row gutter={[16, 16]} className={styles.imageRow}>
                  {selectedExperience.images.map((img, idx) => (
                    <Col xs={24} sm={12} md={8} key={idx}>
                      <AntImage
                        src={img}
                        alt={`${selectedExperience.name} example ${idx + 1}`}
                        className={styles.image}
                        preview={false}
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
          <Collapse ghost className={styles.collapse}>
            <Panel header="View Explanation Experience" key="1">
              {selectedExperience.id !== 'custom' &&
                Array.isArray(selectedExperience.images) &&
                selectedExperience.images.map((img, idx) => (
                  <Row gutter={[16, 16]} key={idx}>
                    <Col xs={24} sm={12} md={8}>
                      <AntImage
                        src={img}
                        alt={`Example ${idx + 1}`}
                        className={styles.image}
                        style={{ maxHeight: 400 }}
                      />
                    </Col>
                  </Row>
                ))}

              {selectedExperience.description && (
                <Paragraph>{selectedExperience.description}</Paragraph>
              )}
            </Panel>
          </Collapse>

          <Card>
            <Title level={3} className={styles.cardTitle}>
              4. Complete the XEQ Scale
            </Title>
            <Paragraph className={styles.cardParagraph}>
              Rate the statements based on your selected experience.
            </Paragraph>
            <XEQForm onSubmit={handleFormSubmit} />
          </Card>
        </>
      ),
    },
    {
      title: 'Results',
      content: formData && (
        <>
          <Results formData={formData} onTryAnother={reset} selectedExperience={selectedExperience.id} stakeholder={stakeholder}/>
        </>
      ),
    },
  ];

  return (
    <Layout className={styles.layout}>
      <PageHeader />
      <Content className={styles.content}>
        <Steps
          current={currentStep}
          responsive
          direction="horizontal"
          className={styles.steps}
          onChange={handleStepChange}
        >
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
            className={styles.stepContent}
          >
            {steps[currentStep].content}
          </motion.div>
        </AnimatePresence>

        <div className={styles.navButtons}>
          {currentStep > 0 && currentStep < 4 && (
            <Button onClick={prev} style={{ marginRight: 8 }}>
              Back
            </Button>
          )}
          {currentStep < 3 && (
            <Button
              type="primary"
              onClick={next}
              disabled={
                (currentStep === 0 && !selectedExperience) ||
                (currentStep === 1 && selectedExperience.id === 'custom' && !stakeholder.trim())
              }
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
