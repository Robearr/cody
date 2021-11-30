import { useKeycloakLogin } from '../hooks/useKeycloakLogin';

interface IndexViewProps {};

export const IndexView: React.FC<IndexViewProps> = () => {

  useKeycloakLogin();

  return (
    <h1>Hello there</h1>
  );
};