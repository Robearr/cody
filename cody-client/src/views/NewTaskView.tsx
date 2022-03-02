import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { TaskForLanguageType } from "../types/Task";
import { LanguageForm } from "../ui/LanguageForm";
import { MessageContext } from '../providers/MessageProvider';
import { useTypedSelector } from '../hooks/useTypedSelector';

import '../styles/form.scss';

interface NewTaskViewProps {};

export const NewTaskView: React.FC<NewTaskViewProps> = () => {
  const [taskForLanguages, setTaskForLanguages] = useState<TaskForLanguageType[]>([]);

  const { addMessage } = useContext(MessageContext);

  const { token } = useTypedSelector((state) => state.keycloak);

  const formik = useFormik({
    initialValues: {
      taskName: '',
      taskDescription: ''
    },
    onSubmit: (values) => {}
  });

  const createNewTaskForLanguage = (): void => {
    setTaskForLanguages([...taskForLanguages, {
      language: `Nyelv #${taskForLanguages.length + 1}`,
      classes: [],
      tests: []
    }]);
  };

  const removeLanguage = (ind: number) => {
    taskForLanguages.splice(ind, 1);
    setTaskForLanguages([...taskForLanguages]);
  };

  const saveTask = (): void => {

    const taskRequest = {
      taskName: formik.values.taskName,
      taskDescription: formik.values.taskDescription,
      taskForLanguages
    };


    fetch(`${process.env.REACT_APP_API_BASE_URL}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ taskRequest })
    }).catch((err) => addMessage({ severity: 'ERROR', message: 'Váratlan hiba történt a mentés során!' }));
  };

  return (
    <div className='form-container'>
      <div className='form'>
        <Typography variant='h4' className='title'>Új feladat</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField id='taskName' label='Feladat neve' value={formik.values.taskName} onChange={formik.handleChange} fullWidth />
          <TextField id='taskDescription' label='Feladat leírása' multiline value={formik.values.taskDescription} onChange={formik.handleChange} fullWidth />
        </form>

        <Typography variant='h4'>Nyelvek</Typography>

        {taskForLanguages.map((taskForLanguage: TaskForLanguageType, ind: number) => (
          <LanguageForm taskForLanguage={taskForLanguage} key={taskForLanguage.language} removeLanguage={() => removeLanguage(ind)}/>
        ))}

        <Button variant='contained' onClick={createNewTaskForLanguage}>Új nyelv</Button>
        <Button variant='contained' onClick={saveTask} className='float-right'>Mentés</Button>
      </div>
    </div>
  );
};