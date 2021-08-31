import { withKnobs } from '@storybook/addon-knobs';
import * as React from 'react';
import Bracket from './Bracket';
import { Side } from './Bracket';

export default {
  title: 'Bracket',
  component: Bracket,
  decorators: [withKnobs],
};

export const DigitInputKnobs: React.FC = () => {
  return <Bracket side={Side.left} />;
};
