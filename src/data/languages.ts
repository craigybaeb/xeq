import { GlobalOutlined } from '@ant-design/icons';
import type { FC } from 'react';

export interface LanguageOption {
  key: string;
  icon: FC;
  language: string;
  author: string;
}

const languages: LanguageOption[] = [
  {
    key: 'en',
    icon: GlobalOutlined,
    language: 'English',
    author: 'The XEQ Team',
  },
];

export default languages;
