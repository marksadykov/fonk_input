import { withKnobs } from '@storybook/addon-knobs';
import * as React from 'react';
import PhoneInput from './PhoneInput';

export default {
  title: 'PhoneInput',
  component: PhoneInput,
  decorators: [withKnobs]
};

export const PhoneInputKnobs: React.FC = () => {
  return <PhoneInput onChange={console.log} />;
};
