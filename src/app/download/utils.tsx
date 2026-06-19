import {
  FilePdfOutlined,
  FileTextOutlined,
  BookOutlined,
  TableOutlined,
  ImportOutlined,
} from '@ant-design/icons';
import { DownloadOption } from './types';

export const downloadOptions: DownloadOption[] = [
  {
    key: 'questionnaire',
    label: 'Questionnaire',
    icon: <FileTextOutlined style={{ fontSize: 24 }} />,
    file:
      'https://github.com/craigybaeb/xeq/blob/main/public/assets/xeq_scale.pdf?raw=true',
    disabled: false,
  },
  {
    key: 'handbook',
    label: 'Handbook',
    icon: <BookOutlined style={{ fontSize: 24 }} />,
    file:
      'https://github.com/craigybaeb/xeq/blob/main/public/assets/xeq_handbook.pdf?raw=true',
    disabled: false,
  },
  {
    key: 'paper',
    label: 'Paper',
    icon: <FilePdfOutlined style={{ fontSize: 24 }} />,
    file:
      'https://github.com/craigybaeb/xeq/blob/main/public/assets/XEQ_Scale_ACM_TIIS_2026.pdf?raw=true',
    disabled: false,
  },
  {
    key: 'sheet',
    label: 'Data Sheet',
    icon: <TableOutlined style={{ fontSize: 24 }} />,
    file:
      'https://raw.githubusercontent.com/craigybaeb/xeq/main/public/assets/XEQ_Data_Analysis_Tool.xlsx',
    disabled: false,
  },
  {
    key: 'notebook',
    label: 'Data Collation Tool',
    icon: <ImportOutlined style={{ fontSize: 24 }} />,
    file: '',
    disabled: true,
  },
];

export const formatLabelList = (labels: string[]) => {
  if (labels?.length === 0) return '';
  if (labels?.length === 1) return labels[0];
  const last = labels.pop();
  return `${labels.join(', ')} and ${last}`;
};
