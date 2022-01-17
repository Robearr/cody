import { Alert, Snackbar, AlertColor } from '@mui/material';
import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Message, MessageContext } from './providers/MessageProvider';
import { Authenticated } from './utils/routes/Authenticated';
import { IndexView } from './views/IndexView';
import { NewTaskView } from './views/NewTaskView';
import { TasksView } from './views/TasksView';
import './styles/common.scss';

function App() {

  const { messages } = useContext(MessageContext);

  return (
    <div>
      <Router /*basename={process.env.PUBLIC_URL}*/>
        <Routes>
          <Route path='/' element={<IndexView />} />
          <Route path='/tasks' element={<TasksView />} />
          <Route path='/new-task' element={<NewTaskView />} />
        </Routes>
      </Router>

      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={!!messages.length} autoHideDuration={5000}>
        <div>
          {messages.map((message: Message) => (
            <Alert key={message.message} severity={message.severity.toLowerCase() as AlertColor}>{message.message}</Alert>
          ))}
        </div>
      </Snackbar>
    </div>
  );
}

export default App;
