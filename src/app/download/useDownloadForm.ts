'use client';

import { useState } from 'react';
import { Form } from 'antd';
import { downloadOptions } from './utils';
import { DownloadOption } from './types';

export function useDownloadForm() {
  const [form] = Form.useForm();
  const [skip, setSkip] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);


  const handleDownload = (keyList: string[]) => {
    keyList.forEach((key) => {
      const target = downloadOptions.find((d: DownloadOption) => d.key === key);
      if (!target) return;
      const link = document.createElement('a');
      link.href = target.file;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const onFinish = (values: Record<string, number>) => {
    console.log('Form submission for:', selected, values);
    handleDownload(selected);
    form.resetFields();
    setShowThankYou(true);
  };

  return {
    form,
    skip,
    setSkip,
    showThankYou,
    selected,
    setSelected,
    onFinish,
    handleDownload,
  };
}
