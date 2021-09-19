import { withKnobs } from '@storybook/addon-knobs';
import * as React from 'react';
import Bracket, { BracketType } from './Bracket';

export default {
  title: 'Bracket',
  component: Bracket,
  decorators: [withKnobs],
};

export const DigitInputKnobs: React.FC = () => {
  return <Bracket type={BracketType.left} />;
};
