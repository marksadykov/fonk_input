import { computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from '../useLocal';

type PrivateFields = '_currentItem' | '_items';

export default class CountriesDropdownStore implements ILocalStore {
  private _currentItem: string | null;
  private _items: string[] | null;

  constructor(currentItem: string | null, items: string[]) {
    this._currentItem = currentItem || items[0];
    this._items = items;
    makeObservable<CountriesDropdownStore, PrivateFields>(this, {
      _currentItem: observable,
      _items: observable,
      currentItem: computed,
      items: computed,
    });
  }

  get currentItem(): string | null {
    return this._currentItem;
  }

  get items(): string[] | null {
    return this._items;
  }

  setCurrentItem = (value: string): void => {
    this._currentItem = value;
  };

  destroy(): void {
    this._currentItem = null;
    this._items = null;
  }
}
