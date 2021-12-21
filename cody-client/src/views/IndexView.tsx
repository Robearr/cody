import { useContext, useEffect, useState } from 'react';
import { useKeycloakLogin } from '../hooks/useKeycloakLogin';
import { KeycloakContext } from '../providers/KeycloakProvider';

interface IndexViewProps {};

export const IndexView: React.FC<IndexViewProps> = () => {

  useKeycloakLogin();
  const { keycloak } = useContext(KeycloakContext);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    keycloak.onReady = () => {
      if (keycloak?.token) {
        setToken(keycloak.token);
      }
    };
  }, [keycloak]);

  const copyToken = (): void => {
    navigator.clipboard.writeText(token);
    alert('Token vágólapra másolva!');
  };

  return (
    <div>
      <h1>Token</h1>
      <code onClick={copyToken} style={{ cursor: 'pointer' }} >{token}</code>
    </div>
  );
};