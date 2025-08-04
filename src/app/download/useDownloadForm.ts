'use client';

import { useState } from 'react';
import { Form } from 'antd';
import { downloadOptions } from './utils';
import { DownloadOption } from './types';
import { Gtag } from './types';

export function useDownloadForm() {
  const [form] = Form.useForm();
  const [skip, setSkip] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const handleDownload = async (keys: string[]) => {
    const selectedFiles = downloadOptions
      .filter((d: DownloadOption) => keys.includes(d.key))
      .map((d) => ({
        name: d.file.split('/').pop() || d.key,
        url: d.file,
      }));

    try {
      const response = await fetch('/api/download-files', {
        method: 'POST',
        body: JSON.stringify({ files: selectedFiles }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        console.error('Failed to fetch ZIP file');
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'XEQ_Toolkit.zip';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const onFinish = async (values: Record<string, number>) => {
    console.log('Form submission for:', selected, values);

    // Google Analytics tracking
    if (typeof window !== 'undefined') {
      const gtag = (window as typeof window & { gtag?: Gtag }).gtag;
      if (typeof gtag === 'function') {
        gtag('event', 'download_submit', {
          job_role: values.jobRole || '',
          industry: values.industry || '',
          selected_files: selected.join(', '),
        });
      }
    }

    await handleDownload(selected);

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
