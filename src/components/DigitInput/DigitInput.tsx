import * as React from 'react';
import './DigitInput.modules.scss';

export type DigitInputProps = {
  value?: string;
  disable?: boolean;
  maxLength?: number;
  onChange?: (value: string) => void;
};

const DigitInput: React.FC<DigitInputProps> = ({
  value,
  disable = false,
  maxLength = 1,
  onChange,
}: DigitInputProps) => {
  const style = React.useMemo(() => {
    return { width: `${maxLength}ch` };
  }, [maxLength]);

  function handleClick(e: any) {
    e.preventDefault();
    if (e.key === 'Backspace') {
      console.log('назад');
      return;
    }
    console.log('вперед');
  }

  const refKek = React.useRef(null);

  return (
    <input
      style={style}
      maxLength={maxLength}
      disabled={disable}
      value={value}
      styleName="digit-input"
      onChange={e => onChange && onChange(e.target.value)}
      onKeyUp={handleClick}
      ref={refKek}
    />
  );
};

export default DigitInput;
