import * as React from 'react';
import { observer } from 'mobx-react-lite';
import PhoneInputStore, { PhoneMask } from '../../store/PhoneInputStore';
import CountriesDropdown from '../CountriesDropdown';
import { useLocalStore } from '../../store/useLocal';
import DigitInput from '../DigitInput';

type PhoneInputProps = {
  masks: PhoneMask[] | null;
  value?: string;
  onChange: (value: string) => void;
};

const PhoneInput = ({ masks, value = '', onChange }: PhoneInputProps) => {
  let digitInputStoresCount = 0;

  const phoneInputStore = useLocalStore(
    () => new PhoneInputStore(masks, value, null)
  );

  React.useEffect(() => {
    onChange(phoneInputStore.formattedPhone || '');
  }, [phoneInputStore.formattedPhone, onChange]);

  return (
    <>
      <CountriesDropdown
        countries={phoneInputStore.countriesDropdownStore.items}
        onChange={phoneInputStore.countriesDropdownStore.setCurrentItem}
      />
      <DigitInput
        disable
        maxLength={2}
        value={phoneInputStore.currentPrefix || ''}
      />
      {phoneInputStore.inputs?.map((item, index) => {
        const Comp = item?.component;
        if (Comp && item.value) {
          return <Comp key={index} type={item.value} />;
        }
        const digitInputStore =
          phoneInputStore.digitInputStores[digitInputStoresCount];
        digitInputStoresCount++;
        return (
          <Comp
            value={digitInputStore.value}
            onChange={digitInputStore.setValue}
            key={index}
          />
        );
      })}
    </>
  );
};

export default observer(PhoneInput);
