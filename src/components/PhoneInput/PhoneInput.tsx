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

  const [lengthRefs, setLengthRefs] = React.useState(0);

  const refs = React.useMemo(
    () =>
      Array.from({ length: lengthRefs }).map(() =>
        React.createRef<HTMLInputElement>()
      ),
    [lengthRefs]
  );

  const focusBefore = (currentIndex: number) => {
    if (currentIndex > 0) {
      refs[currentIndex - 1].current?.focus();
      return;
    }
    refs[refs.length - 1].current?.focus();
  };

  const focusAfter = (currentIndex: number) => {
    if (currentIndex < refs.length - 1) {
      refs[currentIndex + 1].current?.focus();
      return;
    }
    refs[0].current?.focus();
  };

  React.useEffect(() => {
    setLengthRefs(phoneInputStore.digitInputStores.length);
  }, [phoneInputStore.digitInputStores.length]);

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
        maxLength={phoneInputStore.currentPrefixLength}
        value={phoneInputStore.currentPrefix || ''}
      />
      {phoneInputStore.inputs?.map((item, index) => {
        const Comp = item?.component;
        if (Comp && item.value) {
          return <Comp key={index} type={item.value} />;
        }
        const digitInputStore =
          phoneInputStore.digitInputStores[digitInputStoresCount];
        const ref = refs[digitInputStoresCount];
        digitInputStoresCount++;
        return (
          <Comp
            value={digitInputStore.value}
            onChange={digitInputStore.setValue}
            indexInput={digitInputStoresCount - 1}
            focusBefore={focusBefore}
            focusAfter={focusAfter}
            key={index}
            ref={ref}
          />
        );
      })}
    </>
  );
};

export default observer(PhoneInput);
