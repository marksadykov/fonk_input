import { withKnobs } from '@storybook/addon-knobs';
import * as React from 'react';
import CountriesDropdown from './CountriesDropdown';

export default {
  title: 'CountriesDropdown',
  component: CountriesDropdown,
  decorators: [withKnobs],
};

export const CountriesDropdownKnobs: React.FC = () => {
  return (
    <CountriesDropdown countries={['hah', 'hehe']} onChange={console.log} />
  );
};
