import { ILocalStore } from '../useLocal';
import { computed, makeObservable, observable } from 'mobx';

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
    if (this.validateDigit(value)) {
      this._value = value;
    }
  };

  get value(): string {
    return this._value;
  }

  validateDigit(value: string): boolean {
    return (
      (new RegExp('^[0-9]+$').test(value) && value.length === 1) ||
      value.length === 0
    );
  }

  destroy(): void {
    this._value = '';
  }
}
