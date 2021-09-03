import * as React from 'react';
import './DigitInput.modules.scss';

export type DigitInputProps = {
  value?: string;
  disable?: boolean;
  maxLength?: number;
  onChange?: (value: string) => void;
  indexInput?: number;
  focusBefore?: (currentIndex: number) => void;
  focusAfter?: (currentIndex: number) => void;
};

// eslint-disable-next-line react/display-name
const DigitInput = React.forwardRef<HTMLInputElement, DigitInputProps>(
  (
    {
      value,
      disable = false,
      maxLength = 1,
      onChange,
      indexInput,
      focusBefore,
      focusAfter,
    },
    ref
  ) => {
    const style = React.useMemo(() => {
      return { width: `${maxLength}ch` };
    }, [maxLength]);

    const handleKeyUp = (e: any) => {
      e.preventDefault();
      if (indexInput !== undefined) {
        if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
          focusBefore && focusBefore(indexInput);
          return;
        }
        if (
          e.key === 'ArrowRight' ||
          e.key === '1' ||
          e.key === '2' ||
          e.key === '3' ||
          e.key === '4' ||
          e.key === '5' ||
          e.key === '6' ||
          e.key === '7' ||
          e.key === '8' ||
          e.key === '9' ||
          e.key === '0' ||
          e.key === 'Tab'
        ) {
          focusAfter && focusAfter(indexInput);
          return;
        }
      }
    };
    return (
      <input
        style={style}
        maxLength={maxLength}
        disabled={disable}
        value={value}
        styleName="digit-input"
        onChange={e => onChange && onChange(e.target.value)}
        onKeyUp={handleKeyUp}
        ref={ref}
      />
    );
  }
);

export default DigitInput;
