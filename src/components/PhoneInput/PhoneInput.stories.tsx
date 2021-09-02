import { withKnobs } from '@storybook/addon-knobs';
import * as React from 'react';
import PhoneInput from './PhoneInput';

export default {
  title: 'PhoneInput',
  component: PhoneInput,
  decorators: [withKnobs],
};

const masks = [
  {
    key: 'ru',
    name: 'Россия',
    emoji: '🇷🇺',
    prefix: '+7',
    mask: '(***) - *** - ** - **',
  },
  {
    key: 'en',
    name: 'England',
    emoji: '‍🌈',
    prefix: '+9',
    mask: '(***) - *** - ** - **',
  },
];

export const PhoneInputKnobs: React.FC = () => {
  return <PhoneInput masks={masks} onChange={console.log} />;
};
