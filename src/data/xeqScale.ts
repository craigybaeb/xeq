export type XEQFactorKey = 'Utility' | 'Satisfaction' | 'Effectiveness';

export type XEQItem = {
  key: string;
  number: number;
  text: string;
  factor: XEQFactorKey;
};

export type XEQFactor = {
  key: XEQFactorKey;
  title: XEQFactorKey;
  description: string;
  items: XEQItem[];
};

export const xeqItems: XEQItem[] = [
  {
    key: 'item_0',
    number: 1,
    text: 'The explanations received throughout the experience were consistent.',
    factor: 'Effectiveness',
  },
  {
    key: 'item_1',
    number: 2,
    text: 'The experience helped me understand the reliability of the AI system.',
    factor: 'Satisfaction',
  },
  {
    key: 'item_2',
    number: 3,
    text: 'I am confident about using the AI system.',
    factor: 'Utility',
  },
  {
    key: 'item_3',
    number: 4,
    text: 'The information presented during the experience was clear.',
    factor: 'Effectiveness',
  },
  {
    key: 'item_4',
    number: 5,
    text: 'The experience was consistent with my expectations.',
    factor: 'Satisfaction',
  },
  {
    key: 'item_5',
    number: 6,
    text: 'The presentation of the experience was appropriate for my requirements.',
    factor: 'Satisfaction',
  },
  {
    key: 'item_6',
    number: 7,
    text: 'The experience has improved my understanding of how the AI system works.',
    factor: 'Effectiveness',
  },
  {
    key: 'item_7',
    number: 8,
    text: 'The experience helped me build trust in the AI system.',
    factor: 'Effectiveness',
  },
  {
    key: 'item_8',
    number: 9,
    text: 'The experience helped me make more informed decisions.',
    factor: 'Utility',
  },
  {
    key: 'item_9',
    number: 10,
    text: 'I received the explanations in a timely and efficient manner.',
    factor: 'Utility',
  },
  {
    key: 'item_10',
    number: 11,
    text: 'The information presented was personalised to the requirements of my role.',
    factor: 'Utility',
  },
  {
    key: 'item_11',
    number: 12,
    text: 'The information presented was understandable within the requirements of my role.',
    factor: 'Utility',
  },
  {
    key: 'item_12',
    number: 13,
    text: 'The information presented showed me that the AI system performs well.',
    factor: 'Satisfaction',
  },
  {
    key: 'item_13',
    number: 14,
    text: 'The experience helped to complete the intended task using the AI system.',
    factor: 'Utility',
  },
  {
    key: 'item_14',
    number: 15,
    text: 'The experience progressed sensibly.',
    factor: 'Effectiveness',
  },
  {
    key: 'item_15',
    number: 16,
    text: 'The experience was satisfying.',
    factor: 'Satisfaction',
  },
  {
    key: 'item_16',
    number: 17,
    text: 'The information presented during the experience was sufficiently detailed.',
    factor: 'Effectiveness',
  },
  {
    key: 'item_17',
    number: 18,
    text: 'The experience provided answers to all of my explanation needs.',
    factor: 'Effectiveness',
  },
];

export const xeqFactors: XEQFactor[] = [
  {
    key: 'Utility',
    title: 'Utility',
    description: 'The contribution of the experience towards task completion.',
    items: xeqItems.filter((item) => item.factor === 'Utility'),
  },
  {
    key: 'Satisfaction',
    title: 'Satisfaction',
    description: 'The degree to which the experience satisfies stakeholder explanation needs.',
    items: xeqItems.filter((item) => item.factor === 'Satisfaction'),
  },
  {
    key: 'Effectiveness',
    title: 'Effectiveness',
    description: 'The extent to which the experience improves comprehension through clear, coherent explanations.',
    items: xeqItems.filter((item) => item.factor === 'Effectiveness'),
  },
];

export const xeqFactorLabels = xeqFactors.map((factor) => factor.title);
