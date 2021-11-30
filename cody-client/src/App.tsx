import { useKeycloakLogin } from './hooks/useKeycloakLogin';

function App() {

  useKeycloakLogin();

  return (
    <div>
      <h1>Hello there</h1>
    </div>
  );
}

export default App;
