import { FormInstance } from 'antd';
import { Dispatch, JSX, SetStateAction } from 'react';

export interface DownloadOption {
  key: string;
  label: string;
  icon: JSX.Element;
  file: string;
  disabled: boolean;
}

export interface DownloadFormProps {
  form: FormInstance;
  skip: boolean;
  setSkip: Dispatch<SetStateAction<boolean>>;
  selected: string[];
  onFinish: (values: Record<string, number>) => void;
}

export interface DownloadOptionsProps {
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>; // ✅ allows function or direct value
}

export interface ThankYouResultProps {
  selected: string[];
  handleDownload: (selected: string[]) => void;
}
