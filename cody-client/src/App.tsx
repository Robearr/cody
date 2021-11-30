import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Authenticated } from './utils/routes/Authenticated';
import { IndexView } from './views/IndexView';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<IndexView />} />
      </Routes>
    </Router>
  );
}

export default App;
