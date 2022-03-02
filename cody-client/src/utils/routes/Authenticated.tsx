import { Navigate } from "react-router";
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface AuthenticatedProps {};

export const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {
  const { token } = useTypedSelector((state) => state.keycloak);

  return (
    <>
      {token ?
        children :
        <Navigate to='/' />
      }
    </>
  );
};