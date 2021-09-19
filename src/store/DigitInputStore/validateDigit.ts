import { onlyNumberRegExp } from '@utils/constants';

export const validateDigit = (value: string): boolean => {
  return (
    (onlyNumberRegExp.test(value) && value.length === 1) || value.length === 0
  );
};
