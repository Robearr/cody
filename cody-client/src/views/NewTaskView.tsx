import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { TaskForLanguageType } from "../types/Task";
import { LanguageForm } from "../ui/LanguageForm";

interface NewTaskViewProps {};

export const NewTaskView: React.FC<NewTaskViewProps> = () => {
  const [taskForLanguages, setTaskForLanguages] = useState<TaskForLanguageType[]>([]);

  const formik = useFormik({
    initialValues: {
      taskName: '',
      taskDescription: ''
    },
    onSubmit: (values) => {}
  });

  const createNewTaskForLanguage = (): void => {
    setTaskForLanguages([...taskForLanguages, {
      language: '',
      classes: [],
      tests: []
    }]);
  };

  const saveTask = (): void => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskForLanguages)
    });
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField id='taskName' label='Feladat neve' value={formik.values.taskName} onChange={formik.handleChange} />
        <TextField id='taskDescription' label='Feladat leírása' multiline value={formik.values.taskDescription} onChange={formik.handleChange} />
      </form>

      <h1>Nyelvek</h1>
      <Button variant='contained' onClick={createNewTaskForLanguage}>Új nyelv</Button>
      <h1>{taskForLanguages.length}</h1>
      {taskForLanguages.map((taskForLanguage: TaskForLanguageType, ind: number) => (
        <>
          <LanguageForm taskForLanguage={taskForLanguage} key={taskForLanguage.language}/>
          <br />
          <hr />
        </>
      ))}

      <br />
      <br />
      <br />
      <br />
      <Button variant='contained' onClick={saveTask}>Mentés</Button>
    </div>
  );
};