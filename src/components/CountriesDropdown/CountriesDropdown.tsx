import * as React from 'react';
import './CountriesDropdown.modules.scss';

type CountriesDropdownProps = {
  countries: string[] | null;
  onChange: (v: string) => void;
};

const CountriesDropdown: React.FC<CountriesDropdownProps> = ({
  countries,
  onChange,
}: CountriesDropdownProps) => {
  return (
    <select
      onChange={e => onChange(e.target.value)}
      styleName="country-dropdown"
    >
      {countries?.map((item: string) => (
        <option key={item}>{item}</option>
      ))}
    </select>
  );
};

export default CountriesDropdown;
