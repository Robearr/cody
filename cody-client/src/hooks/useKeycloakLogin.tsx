import { useContext, useEffect } from "react";
import { KeycloakContext } from '../providers/KeycloakProvider';

export const useKeycloakLogin = () => {

  const { keycloak } = useContext(KeycloakContext);

  useEffect(() => {
    if (keycloak) {
      keycloak.init({ onLoad: 'login-required' }).then(
        (auth: boolean) => {
          if (!auth) {
            keycloak.login();
          }
        }
      );
    }
  }, [keycloak]);

};