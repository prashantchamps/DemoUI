import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react';
import { InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser";
import { Container, Button } from 'react-bootstrap';
import { PageLayout } from './components/PageLayout';
import { Login } from './components/auth/Login';
import { IdTokenData } from './components/DataDisplay';
import { loginRequest } from './msalConfig';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotAuthorized } from './screens/NotAuthorized';
import { NoPage } from './screens/NoPage';
import './styles/App.css';

import {
  useState,
  useCallback,
} from 'react';

import { InteractionType } from '@azure/msal-browser';
import { useMsalAuthentication } from "@azure/msal-react";

const MainContent = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getAccountByUsername("prashant.champs@gmail.com");
  //const test1 = instance.acquireTokenSilent(loginRequest)
  //                      .then((accessTokenResponse) => {
  //                        let accessToken = accessTokenResponse.accessToken;
  //                        let temp = "";
  //                        //callApi(accessToken).then((response) => {
  //                        //  setApiData(response);
  //                        //});
  //                      })
  //                      .catch((error) => {
  //                        if (error instanceof InteractionRequiredAuthError) {
  //                          instance.acquireTokenRedirect(loginRequest);
  //                        }
  //                        //console.log(error);
  //                      });

  const handleRedirect = () => {
      instance
          .loginRedirect({
              ...loginRequest,
              prompt: 'create',
          })
          .catch((error) => console.log(error));
  };
  return (
      <div className="App">
          <AuthenticatedTemplate>
              {activeAccount ? (
                <BrowserRouter>
                  <Container>
                    <Routes>
                      <Route path="/" element=
                        {<IdTokenData idTokenClaims={activeAccount.idTokenClaims} />}
                      />
                      <Route path="*" element={<NoPage />} />
                    </Routes>
                  </Container>
                </BrowserRouter>
              ) : (<NotAuthorized />)}
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Login>
              <Button className="signInButton" onClick={handleRedirect} variant="primary">
                  Sign up
              </Button>
            </Login>
          </UnauthenticatedTemplate>
      </div>
  );
};

const App = ({ instance }) => {
  return (
      <MsalProvider instance={instance}>
        <MainContent />
      </MsalProvider>
  );
};

export default App;