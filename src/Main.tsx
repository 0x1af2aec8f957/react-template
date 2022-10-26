import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from "i18next";

import './setup/i18n-setup';
import Routes from './setup/router-setup';

import './assets/stylesheet/global.css';

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Routes />
    </I18nextProvider>
  )
}

createRoot(document.getElementById('root') as HTMLElement)
.render(
  <App />
);