import { Outlet } from "react-router";
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useKeycloakLogin } from '../../hooks/useKeycloakLogin';
import { Link } from 'react-router-dom';

interface AuthenticatedProps {};

export const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {

  useKeycloakLogin();

  const { token } = useTypedSelector((state) => state.keycloak);

  return (
    <>
      {token ?
        <Outlet /> :
        <Link to={`${process.env.REACT_APP_KEYCLOAK_URL}/auth`} />
      }
    </>
  );
};