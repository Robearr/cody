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

  useEffect(() => {

    keycloak.onTokenExpired = () => {
      keycloak.updateToken(30).then(() => {
        dispatch(setKeycloakToken(keycloak.token));
      });
    };

    keycloak.onAuthSuccess = () => {
      dispatch(setKeycloakToken(keycloak.token));
    };

    keycloak.onAuthError = () => {
      dispatch(setKeycloakToken(null));
    };

    keycloak.onAuthRefreshSuccess = () => {
      dispatch(setKeycloakToken(keycloak.token));
    };

    keycloak.onAuthRefreshError = () => {
      dispatch(setKeycloakToken(null));
    };

    keycloak.onReady = () => {
      if (keycloak.authenticated) {
        dispatch(setKeycloakToken(keycloak.token));
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