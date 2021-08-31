import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from 'mobx';
import CountriesDropdownStore from '../CountriesDropdownStore';

export type PhoneMask = {
  key: string;
  name: string;
  emoji: string;
  prefix: string;
  mask: string;
};

const maskItem = {
  star: '*',
  leftBracket: '(',
  rightBracket: ')',
  dash: '-',
};

type PhoneParams = {
  key: string;
  name: string;
  emoji: string;
  prefix: string;
  mask: string[];
};

const normalizeMask = (mask: string): string[] => {
  return mask.replace(/\s/g, '').split('');
};

const normalizeParams = (phoneMasks: PhoneMask[]): PhoneParams[] => {
  return phoneMasks.map((item: PhoneMask) => {
    return {
      key: item.key,
      name: item.name,
      emoji: item.emoji,
      prefix: item.prefix,
      mask: normalizeMask(item.mask),
    };
  });
};

const normalizePrefix = (phoneMasks: PhoneMask[]): string[] => {
  return phoneMasks.map(item => item.prefix);
};

// const normalizeValue = (value: string, prefix: string[]): string[] => {
//   return value
//     .replace(prefix, '')
//     .replace(/\D+/g, '')
//     .split('');
// };

type PrivateFields = '_phoneParams' | '_prefix' | '_value';

export default class PhoneInputStore {
  private _phoneParams: PhoneParams[] | undefined;
  private _prefix: string[] | undefined;
  private _value: string | undefined;

  _countriesDropdownStore: CountriesDropdownStore;

  constructor(
    phoneMasks: PhoneMask[],
    value: string,
    currentItem: string | null,
    items: string[]
  ) {
    this._phoneParams = normalizeParams(phoneMasks);
    this._prefix = normalizePrefix(phoneMasks);
    this._value = value;
    this._countriesDropdownStore = new CountriesDropdownStore(
      currentItem,
      items
    );

    makeObservable<PhoneInputStore, PrivateFields>(this, {
      _phoneParams: observable,
      _prefix: observable,
      _value: observable,
    });
  }

  // get value(): string[] {
  //   return this._phoneParams.find(item => item.prefix);
  // }

  get countriesDropdownStore(): CountriesDropdownStore {
    return this._countriesDropdownStore;
  }

  destroy(): void {}
}
