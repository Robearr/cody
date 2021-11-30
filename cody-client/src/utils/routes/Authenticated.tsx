import { useContext } from "react";
import { Navigate } from "react-router";
import { KeycloakContext } from "../../providers/KeycloakProvider";

interface AuthenticatedProps {};

export const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {
  const { keycloak } = useContext(KeycloakContext);

  return (
    <>
      {keycloak?.token && !keycloak?.isTokenExpired() ?
        children :
        <Navigate to='/' />
      }
    </>
  );
};