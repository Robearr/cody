import Keycloak from "keycloak-js";
import { createContext } from "react";

interface KeycloakContextProps {
  keycloak: Keycloak.KeycloakInstance;
};

const keycloak = Keycloak({
  realm: process.env.REACT_APP_REALM_NAME,
  clientId: process.env.REACT_APP_CLIENT_ID,
  url: `${process.env.REACT_APP_API_BASE_URL}/auth`,
});

export const KeycloakContext = createContext<KeycloakContextProps>({ keycloak });

interface KeycloakProviderProps {};

export const KeycloakProvider: React.FC<KeycloakProviderProps> = ({ children }) => {
  const value = { keycloak };

  return (
    <KeycloakContext.Provider value={value}>{children}</KeycloakContext.Provider>
  );
};