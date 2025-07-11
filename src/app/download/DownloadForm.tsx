'use client';

import React from 'react';
import { Form, Input, Checkbox, Button, Typography } from 'antd';
import { DownloadFormProps } from './types';
import { formatLabelList } from './utils';

const { Title } = Typography;

const DownloadForm: React.FC<DownloadFormProps> = ({
  form,
  skip,
  setSkip,
  selected,
  onFinish,
}) => {
  return (
    <>
      <Title level={2} style={{ textAlign: 'center' }}>
        Access your download{selected?.length > 1 ? 's' : ''}
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={!skip}
        style={{ marginTop: '2rem' }}
      >
        <div aria-disabled={skip}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: !skip, type: 'email' }]}
          >
            <Input placeholder="e.g., yourname@example.com" disabled={skip} />
          </Form.Item>

          <Form.Item
            name="jobRole"
            label="Job Role"
            rules={[{ required: !skip }]}
          >
            <Input placeholder="e.g., Researcher" disabled={skip} />
          </Form.Item>

          <Form.Item
            name="industry"
            label="Industry"
            rules={[{ required: !skip }]}
          >
            <Input placeholder="e.g., Finance, Education" disabled={skip} />
          </Form.Item>
        </div>

        <Form.Item
          name="agree"
          valuePropName="checked"
          rules={[{
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error('You must agree to the license.')),
          }]}
        >
          <Checkbox>
            By checking this box, I understand the terms of the{' '}
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              license
            </a>.
          </Checkbox>
        </Form.Item>

        <Form.Item name="skip" valuePropName="checked">
          <Checkbox onChange={(e) => setSkip(e.target.checked)}>
            I’ve already submitted my details
          </Checkbox>
        </Form.Item>

        <Form.Item style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Button type="primary" htmlType="submit" disabled={selected?.length === 0}>
            Download {formatLabelList([...selected])}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default DownloadForm;
