import React from 'react';
import ReactDOM from 'react-dom';
import PhoneInput from './components/PhoneInput';

const masks = [
  {
    key: 'ru',
    name: 'Россия',
    emoji: '🇷🇺',
    prefix: '+7',
    mask: '(***) - *** - ** - **',
  },
  {
    key: 'en',
    name: 'England',
    emoji: '‍🌈',
    prefix: '+44',
    mask: '(***) - *** - ** - **',
  },
  {
    key: 'by',
    name: 'Беларусь',
    emoji: '🇧🇾',
    prefix: '+375',
    mask: '*** - )***) - *(* - **',
  },
];

ReactDOM.render(
  <React.StrictMode>
    <PhoneInput masks={masks} onChange={console.log} />
  </React.StrictMode>,
  document.getElementById('root')
);
