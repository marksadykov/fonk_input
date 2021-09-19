import * as React from 'react';
import {
  isDigitKey,
  isFocusBeforeEvent,
  isFocusAfterEvent,
  isBackspace,
  isDigit,
} from './events';
import './DigitInput.modules.scss';

export type DigitInputProps = {
  value?: string;
  disable?: boolean;
  maxLength?: number;
  changeCallBack?: (value: string) => void;
  indexInput?: number;
  focusBefore?: (currentIndex: number) => void;
  focusAfter?: (currentIndex: number) => void;
  pasteAfter?: (indexInput: number, value: string) => void;
};

// eslint-disable-next-line react/display-name
const DigitInput = React.forwardRef<HTMLInputElement, DigitInputProps>(
  (
    {
      value,
      disable = false,
      maxLength = 1,
      changeCallBack,
      indexInput,
      focusBefore,
      focusAfter,
      pasteAfter,
    },
    ref
  ) => {
    const style = React.useMemo(() => {
      return { width: `${maxLength}ch` };
    }, [maxLength]);

    const handleKeyUp = React.useCallback(
      (e: React.KeyboardEvent) => {
        e.preventDefault();
        if (indexInput !== undefined) {
          if (isFocusBeforeEvent(e)) {
            focusBefore?.(indexInput);
            isBackspace(e) && changeCallBack?.('');
            return;
          }
          if (isFocusAfterEvent(e)) {
            isDigitKey(e) && changeCallBack?.(e.key);
            focusAfter?.(indexInput);
            return;
          }
        }
      },
      [indexInput, focusBefore, focusAfter, changeCallBack]
    );

    const onPasteCallback = React.useCallback(
      (e: React.ClipboardEvent) => {
        e.preventDefault();
        const value = e.clipboardData.getData('text');
        changeCallBack?.(value);
        if (indexInput !== undefined) {
          pasteAfter?.(indexInput, value);
          if (isDigit(value)) {
            focusAfter?.(indexInput);
          }
        }
      },
      [changeCallBack, focusAfter, indexInput, pasteAfter]
    );

    return (
      <input
        style={style}
        maxLength={maxLength}
        disabled={disable}
        value={value}
        styleName="digit-input"
        onKeyUp={handleKeyUp}
        onPaste={onPasteCallback}
        ref={ref}
      />
    );
  }
);

export default DigitInput;
