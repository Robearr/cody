import { AppBar, Typography } from '@mui/material';
import { Route, Routes } from 'react-router';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { Index } from './pages/Index';
import { NewTask } from './pages/task/NewTask';
import { Tasks } from './pages/task/Tasks';
import { Authenticated } from './utils/routes/Authenticated';

import logo from './images/logo.png';

interface CodyRouterProps { }

export const CodyRouter: React.FC<CodyRouterProps> = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AppBar position='static' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <Link to={'/'}>
          <img src={logo} alt='logo' style={{ width: '20%' }} />
        </Link>
        <Link to={`/tasks`} color='inherit'><Typography variant='h6'>Feladatok</Typography></Link>
        <Link to={`/tasks/new`} color='inherit'><Typography variant='h6'>Új feladat</Typography></Link>
      </AppBar>
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