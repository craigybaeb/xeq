'use client';

import React from 'react';
import { Button, Typography, Space, theme } from 'antd';
import { downloadOptions } from './utils';
import { DownloadOptionsProps } from './types';

const { Text } = Typography;

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ selected, setSelected }) => {
  const { token } = theme.useToken();

  return (
    <Space size="large" style={{ margin: '2rem 0' }}>
      {downloadOptions.map(({ key, label, icon, disabled }) => (
        <div key={key} style={{ textAlign: 'center', opacity: disabled ? 0.4 : 1 }}>
          <Button
            shape="circle"
            size="large"
            icon={icon}
            onClick={() => {
              if (disabled) return;
              setSelected((prev) =>
                prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
              );
            }}
            disabled={disabled}
            type={selected.includes(key) && !disabled ? 'primary' : 'default'}
            style={{ width: 60, height: 60, cursor: disabled ? 'not-allowed' : 'pointer' }}
          />
          <div style={{ marginTop: 8 }}>
          <Text>{label}</Text>
          <div style={{
            fontSize: '0.75rem',
            color: token.colorTextSecondary,
            minHeight: 18,
            visibility: disabled ? 'visible' : 'hidden',
          }}>
            Coming soon
          </div>
        </div>
                </div>
              ))}
            </Space>
          );
        };

export default DownloadOptions;
