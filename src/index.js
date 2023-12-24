import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './msalConfig';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const pca = new PublicClientApplication(msalConfig);

if (!pca.getActiveAccount() && pca.getAllAccounts().length > 0) {
  pca.setActiveAccount(pca.getActiveAccount()[0]);
}

pca.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      const account = event.payload.account;
      pca.setActiveAccount(account);
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App instance={pca}/>
);