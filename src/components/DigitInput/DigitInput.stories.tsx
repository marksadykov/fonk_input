import { withKnobs } from '@storybook/addon-knobs';
import * as React from 'react';
import DigitInput from './DigitInput';

export default {
  title: 'DigitInput',
  component: DigitInput,
  decorators: [withKnobs],
};

export const DigitInputKnobs: React.FC = () => {
  return <DigitInput />;
};
