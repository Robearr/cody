import { Alert, Snackbar, AlertColor, AppBar, Typography } from '@mui/material';
import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Message, MessageContext } from './providers/MessageProvider';
import { Authenticated } from './utils/routes/Authenticated';
import { IndexView } from './views/IndexView';
import { NewTaskView } from './views/NewTaskView';
import { TasksView } from './views/TasksView';
import { CountDownCloseButton } from './ui/CountDownCloseButton';

import logo from './images/logo.png';
import './styles/common.scss';

function App() {

  const { messages, addMessage, removeMessage } = useContext(MessageContext);

  return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <AppBar position='static' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <Link to={process.env.PUBLIC_URL}>
            <img src={logo} alt='logo' style={{ width: '20%' }}/>
          </Link>
          <Link to={`/tasks`} color='inherit'><Typography variant='h6'>Feladatok</Typography></Link>
          <Link to={`/new-task`} color='inherit'><Typography variant='h6'>Új feladat</Typography></Link>
        </AppBar>
        <Routes>
          <Route path='/' element={<IndexView />} />
          <Route path='/tasks' element={<TasksView />} />
          <Route path='/new-task' element={<NewTaskView />} />
        </Routes>
      </Router>

      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={!!messages.length}>
        <div>
          {messages.map((message: Message) => (
            <Alert
              severity={message.severity.toLowerCase() as AlertColor}
              action={<CountDownCloseButton onClick={() => removeMessage(message)} />}
              key={message.message}
            >
              {message.message}
            </Alert>
          ))}
        </div>
      </Snackbar>
    </div>
  );
}

export default App;
