'use client';

import React from 'react';
import { Button, Result } from 'antd';
import { ThankYouResultProps } from './types';
import Citation from '@/app/components/Citation';
import { formatLabelList } from './utils';

const ThankyouResult: React.FC<ThankYouResultProps> = ({ selected, handleDownload }) => {
  return (
    <Result
      status="success"
      title="Thank you!"
      subTitle={`Your download${selected.length > 1 ? 's have' : ' has'} started.`}
      extra={[
        <Button key="download" type="primary" onClick={() => handleDownload(selected)}>
          Re-download {formatLabelList([...selected])}
        </Button>,
        <Citation key="citation" />,
      ]}
    />
  );
};

export default ThankyouResult;
