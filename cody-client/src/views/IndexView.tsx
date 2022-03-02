import { useKeycloakLogin } from '../hooks/useKeycloakLogin';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface IndexViewProps {};

export const IndexView: React.FC<IndexViewProps> = () => {

  useKeycloakLogin();

  const { token } = useTypedSelector((state) => state.keycloak);

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