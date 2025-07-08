import { FileTextOutlined, BookOutlined, TableOutlined } from '@ant-design/icons';
import { DownloadOption } from './types';

export const downloadOptions: DownloadOption[] = [
  {
    key: 'questionnaire',
    label: 'Questionnaire',
    icon: <FileTextOutlined style={{ fontSize: 24 }} />,
    file: 'https://github.com/craigybaeb/xeq/blob/main/public/assets/xeq_scale.pdf?raw=true',
    disabled: false,
  },
  {
    key: 'handbook',
    label: 'Handbook',
    icon: <BookOutlined style={{ fontSize: 24 }} />,
    file: '/assets/xeq_handbook.pdf',
    disabled: true,
  },
  {
    key: 'sheet',
    label: 'Data Sheet',
    icon: <TableOutlined style={{ fontSize: 24 }} />,
    file: '/assets/xeq_data_sheet.xlsx',
    disabled: true,
  },
];

export const formatLabelList = (labels: string[]) => {
  if (labels.length === 0) return '';
  if (labels.length === 1) return labels[0];
  const last = labels.pop();
  return `${labels.join(', ')} and ${last}`;
};
