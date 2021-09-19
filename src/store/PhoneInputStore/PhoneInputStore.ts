import { computed, makeObservable, observable } from 'mobx';
import CountriesDropdownStore from '../CountriesDropdownStore';
import { ILocalStore } from '../useLocal';
import DigitInput, { DigitInputProps } from '@components/DigitInput';
import Bracket, { BracketProps, BracketType } from '@components/Bracket';
import * as React from 'react';
import DigitInputStore from '../DigitInputStore';
import { symbols } from '@utils/symbols';

export type PhoneMask = {
  key: string;
  name: string;
  emoji: string;
  prefix: string;
  mask: string;
};

export type InputItem = {
  value?: BracketType;
  component:
    | React.FC<BracketProps>
    | React.ForwardRefExoticComponent<
        Pick<
          DigitInputProps,
          | 'value'
          | 'disable'
          | 'maxLength'
          | 'changeCallBack'
          | 'indexInput'
          | 'focusBefore'
          | 'focusAfter'
          | 'pasteAfter'
        > &
          React.RefAttributes<HTMLInputElement>
      >;
};

const maskItem: Record<string, string> = {
  [symbols.leftBracket]: ' (',
  [symbols.rightBracket]: ')',
  [symbols.dash]: ' - ',
};

const inputItem: Record<string, InputItem> = {
  [symbols.leftBracket]: {
    value: BracketType.left,
    component: Bracket,
  },
  [symbols.rightBracket]: {
    value: BracketType.right,
    component: Bracket,
  },
  [symbols.dash]: {
    value: BracketType.dash,
    component: Bracket,
  },
  [symbols.star]: {
    component: DigitInput,
  },
};

type PrivateFields = '_phoneMask' | '_value' | '_countriesDropdownStore';

export default class PhoneInputStore implements ILocalStore {
  private _phoneMask: PhoneMask[] | null;
  private _value: string | null;

  private _countriesDropdownStore: CountriesDropdownStore;
  private _digitInputStores: DigitInputStore[] = [];

  constructor(
    phoneMasks: PhoneMask[] | null,
    value: string,
    currentItem: string | null
  ) {
    this._phoneMask = phoneMasks;
    this._value = value || '';
    this._countriesDropdownStore = new CountriesDropdownStore(
      currentItem,
      phoneMasks?.map(item => item.emoji) || []
    );

    makeObservable<PhoneInputStore, PrivateFields>(this, {
      _phoneMask: observable,
      _value: observable,
      _countriesDropdownStore: observable,
      countriesDropdownStore: computed,
      currentEmoji: computed,
      currentMask: computed,
      currentPrefix: computed,
      formattedPhone: computed,
      digitInputStores: computed,
    });
  }

  get valueInput(): string | null {
    return this.digitInputStores.reduce((acc, item: DigitInputStore) => {
      return acc + item.value;
    }, '');
  }

  get value(): string | null {
    return this._value || this.valueInput;
  }

  get countriesDropdownStore(): CountriesDropdownStore {
    return this._countriesDropdownStore;
  }

  get currentEmoji(): string | null {
    return this._countriesDropdownStore.currentItem;
  }

  get currentMask(): PhoneMask | null {
    return (
      this._phoneMask?.find(item => item.emoji === this.currentEmoji) || null
    );
  }

  get currentPrefix(): string | null {
    return this.currentMask?.prefix || null;
  }

  get currentPrefixLength(): number {
    return this.currentMask?.prefix.length || 0;
  }

  get formattedPhone(): string | null {
    const valueWithoutPrefix =
      this.value
        ?.replace(String(this.currentPrefix), '')
        .replace(/\s/g, '')
        .split('') || null;
    return (
      (this.currentPrefix || '') +
        this.currentMask?.mask
          .replace(/\s/g, '')
          .split('')
          .map((item: string) => {
            if (maskItem[item]) {
              return maskItem[item];
            }
            return valueWithoutPrefix?.shift();
          })
          ?.join('') || null
    );
  }

  get inputs(): InputItem[] | null {
    return (
      this.currentMask?.mask
        .replace(/ /g, '')
        .split('')
        .map((item: string) => inputItem[item]) || null
    );
  }

  get digitInputStores(): DigitInputStore[] {
    const maskLength = this.currentMask?.mask.match(/\*/g)?.length || 0;
    for (let i = 0; i < maskLength; i++) {
      this._digitInputStores.push(new DigitInputStore());
    }
    return this._digitInputStores;
  }

  destroy(): void {
    this._phoneMask = null;
    this._value = null;
    this._countriesDropdownStore.destroy();
  }
}
