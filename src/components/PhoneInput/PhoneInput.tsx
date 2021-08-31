import * as React from 'react';
import PhoneInputStore, { PhoneMask } from '../../store/PhoneInputStore';
import CountriesDropdown from '../CountriesDropdown';

type PhoneInputProps = {
  masks?: PhoneMask[];
  value?: string;
  onChange: (value: string) => void;
};

const PhoneInput = ({ onChange }: PhoneInputProps) => {
  const masks = [
    {
      key: 'ru',
      name: 'Россия',
      emoji: '🇷🇺',
      prefix: '+7',
      mask: '(***) - *** - ** - **',
    },
  ];

  const value = '+71234567890';

  onChange('+7 123 45');

  const phoneInputStore = new PhoneInputStore(masks, value, null, ['ru', 'en']);

  return (
    <CountriesDropdown
      countries={phoneInputStore.countriesDropdownStore.items}
    />
  );
};

export default PhoneInput;
