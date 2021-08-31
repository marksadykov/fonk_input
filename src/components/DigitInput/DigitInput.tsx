import * as React from 'react';
import './DigitInput.modules.scss';

type DigitInputProps = {
  value?: number;
  disable?: boolean;
};

const DigitInput: React.FC<DigitInputProps> = ({
  value,
  disable = false
}: DigitInputProps) => {
  return (
    <input
      maxLength={1}
      disabled={disable}
      value={value}
      className="digit-input"
    />
  );
};

export default DigitInput;
