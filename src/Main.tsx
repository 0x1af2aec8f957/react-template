// Android8.1.0 Webview 需要主动填充
import 'intl-pluralrules';
// Android8.1.0 Webview 无法使用 Promise.finally，需要主动填充
import 'finally-polyfill';
// Android8.1.0 Webview 无法使用 Abortcontroller，需要主动填充
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';

import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from "i18next";

import './setup/i18n-setup';
import Routes from './setup/router-setup';

import './assets/stylesheet/global.scss';

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