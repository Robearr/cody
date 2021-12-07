import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Authenticated } from './utils/routes/Authenticated';
import { IndexView } from './views/IndexView';

function App() {

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<IndexView />} />
      </Routes>
    </Router>
  );
}

export default App;
