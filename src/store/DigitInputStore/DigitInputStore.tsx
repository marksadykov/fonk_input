import { ILocalStore } from '../useLocal';
import { computed, makeObservable, observable } from 'mobx';
import { validateDigit } from './validateDigit';

type PrivateFields = '_value';

export default class DigitInputStore implements ILocalStore {
  private _value = '';

  constructor() {
    makeObservable<DigitInputStore, PrivateFields>(this, {
      _value: observable,
      value: computed,
    });
  }

  setValue = (value: string): void => {
    if (validateDigit(value)) {
      this._value = value;
    }
  };

  get value(): string {
    return this._value;
  }

  destroy(): void {
    this._value = '';
  }
}
