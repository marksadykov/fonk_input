import * as React from 'react';

export const isDigit = (value: string): boolean => {
  return (
    value === '1' ||
    value === '2' ||
    value === '3' ||
    value === '4' ||
    value === '5' ||
    value === '6' ||
    value === '7' ||
    value === '8' ||
    value === '9' ||
    value === '0'
  );
};

export const isBackspace = (e: React.KeyboardEvent): boolean => {
  return e.key === 'Backspace';
};

export const isDigitKey = (e: React.KeyboardEvent): boolean => {
  return isDigit(e.key);
};

export const isFocusBeforeEvent = (e: React.KeyboardEvent): boolean => {
  return isBackspace(e) || e.key === 'ArrowLeft';
};

export const isFocusAfterEvent = (e: React.KeyboardEvent): boolean => {
  return e.key === 'ArrowRight' || e.key === 'Tab' || isDigitKey(e);
};
