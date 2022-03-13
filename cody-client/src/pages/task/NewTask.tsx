import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { TaskForLanguageType } from "../../types/Task";
import { LanguageForm } from "../../modules/task/LanguageForm";

import '../../styles/form.scss';
import { useAjax } from '../../hooks/useAjax';

interface NewTaskProps {};

export const NewTask: React.FC<NewTaskProps> = () => {
  const [taskForLanguages, setTaskForLanguages] = useState<TaskForLanguageType[]>([]);

  const { ajax } = useAjax();

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

    ajax.post('/task', { taskRequest });
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