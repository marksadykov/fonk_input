import { makeObservable, observable } from 'mobx';

export default class CountriesDropdownStore {
  private _currentItem: string;
  private _items: string[] | null;

  constructor(currentItem: string | null, items: string[]) {
    this._currentItem = currentItem || items[0];
    this._items = items;
    makeObservable<CountriesDropdownStore>(this, {});
  }

  get currentItem(): string {
    return this._currentItem;
  }

  get items(): string[] | null {
    return this._items;
  }

  setCurrentItem = (value: string) => {
    console.log('this._currentItem', this);
    console.log('value_setCurrentItem', value);
    this._currentItem = value;
  };
}
