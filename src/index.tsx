import React from 'react';
import ReactDOM from 'react-dom';
import TestDiv from './components/TestDiv';
import PhoneInput from './components/PhoneInput';

const App = () => (
  <>
    <h1>Тестовый компонент</h1>
    <PhoneInput onChange={console.log} />
  </>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
