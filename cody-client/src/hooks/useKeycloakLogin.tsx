import Keycloak from 'keycloak-js';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setKeycloakToken } from '../redux/actions/keycloak';

export const useKeycloakLogin = () => {

  const dispatch = useDispatch();

  const keycloak = Keycloak({
    realm: process.env.REACT_APP_REALM_NAME,
    clientId: process.env.REACT_APP_CLIENT_ID,
    url: `${process.env.REACT_APP_KEYCLOAK_URL}/auth`,
  });

  const saveToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('cody-token', token);
    } else {
      localStorage.removeItem('cody-token');
    }

    dispatch(setKeycloakToken(token));
  };

  useEffect(() => {

    if (localStorage.getItem('cody-token')) {
      dispatch(setKeycloakToken(localStorage.getItem('cody-token')));
    }

    keycloak.onTokenExpired = () => {
      keycloak.updateToken(30).then(() => {
        saveToken(keycloak.token);
      });
    };

    keycloak.onAuthSuccess = () => {
      saveToken(keycloak.token);
    };

    keycloak.onAuthError = () => {
      saveToken(null);
    };

    keycloak.onAuthRefreshSuccess = () => {
      saveToken(keycloak.token);
    };

    keycloak.onAuthRefreshError = () => {
      saveToken(null);
    };

    keycloak.onReady = () => {
      if (keycloak.authenticated) {
        saveToken(keycloak.token);
      }
    };

    keycloak.init({ onLoad: 'login-required' }).then(
      (auth: boolean) => {
        if (!auth) {
          keycloak.login();
        }
      }
    );
  }, []);

};