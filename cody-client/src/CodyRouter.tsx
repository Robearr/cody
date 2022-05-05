import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBar } from './modules/navbar/Navbar';
import { Index } from './pages/Index';
import { NewTask } from './pages/task/NewTask';
import { Tasks } from './pages/task/Tasks';
import { Authenticated } from './utils/routes/Authenticated';

interface CodyRouterProps { }

export const CodyRouter: React.FC<CodyRouterProps> = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Authenticated />}>
          <Route path='/' element={<Index />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/tasks/:uuid' element={<NewTask />} />
          <Route path='/task/new' element={<NewTask />} />
        </Route>
      </Routes>
    </Router>
  );
};