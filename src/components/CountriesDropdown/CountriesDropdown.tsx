import * as React from 'react';
import './CountriesDropdown.modules.scss';

type CountriesDropdownProps = {
  countries: string[] | null;
};

const CountriesDropdown: React.FC<CountriesDropdownProps> = ({
  countries,
}: CountriesDropdownProps) => {
  return (
    <select className="country-dropdown">
      {countries?.map((item: string) => (
        <option key={item}>{item}</option>
      ))}
    </select>
  );
};

export default CountriesDropdown;
