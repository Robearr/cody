import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Task, TaskForLanguageType } from "../../types/Task";
import { LanguageForm } from "../../modules/task/LanguageForm";

import '../../styles/form.scss';
import { useAjax } from '../../hooks/useAjax';
import { CodyForm } from '../../ui/form/CodyForm';
import { InputField } from '../../ui/form/InputField';
import { useParams } from 'react-router';

interface NewTaskProps { };

export const NewTask: React.FC<NewTaskProps> = () => {
  const { uuid } = useParams();
  const [task, setTask] = useState<Task>({
    taskDescription: '',
    taskName: '',
    taskForLanguages: [{
      language: null,
      classes: [{
        className: '',
        classSource: ''
      }],
      tests: [{
        className: '',
        classSource: '',
        methodParams: {},
        methodToCall: '',
        testDescription: '',
        timingTest: false
      }]
    }],
  } as Task);

  const { ajax } = useAjax();

  const removeLanguage = (ind: number) => {
    setTask({
      ...task,
      taskForLanguages: task.taskForLanguages.filter((_, i) => i !== ind)
    });
  };

  const addLanguage = () => {
    setTask({
      ...task,
      taskForLanguages: task.taskForLanguages.concat({
        language: null,
        classes: [{
          className: '',
          classSource: ''
        }],
        tests: [{
          className: '',
          classSource: '',
          methodParams: {},
          methodToCall: '',
          testDescription: '',
          timingTest: false
        }]
      })
    });
  };

  const removeGroup = (group: 'test' | 'class', ind: number) => {
    setTask({
      ...task,
      taskForLanguages: task.taskForLanguages.map((lang, i) => {
        if (i === ind) {
          if (group === 'test') {
            lang.tests = lang.tests.filter((_, i) => i !== ind);
          } else if (group === 'class') {
            lang.classes = lang.classes.filter((_, i) => i !== ind);
          }
        }
        return lang;
      })
    });
  };

  const addNewGroup = (group: 'test' | 'class') => {
    setTask({
      ...task,
      taskForLanguages: task.taskForLanguages.map((lang, i) => {
        if (group === 'test') {
          lang.tests.push({
            className: '',
            classSource: '',
            methodParams: {},
            methodToCall: '',
            testDescription: '',
            timingTest: false
          });
        } else if (group === 'class') {
          lang.classes.push({
            className: '',
            classSource: ''
          });
        }
        return lang;
      })
    });
  };

  const saveTask = (values): void => {
    setTask(values);
    ajax.post('/task', { taskRequest: values });
  };

  useEffect(() => {
    if (uuid) {
      ajax.get(`/task/${uuid}`).then((task) => {
        setTask(task);
      });
    }
  }, [uuid]);

  return (
    <div className='form-container'>
      <div className='form'>
        <Typography variant='h4' className='title'>Új feladat</Typography>

        <CodyForm model={task} onSubmit={saveTask}>
          <InputField attr='taskName' label='Feladat neve' />
          <InputField attr='taskDescription' label='Feladat leírása' />

          <Typography variant='h4'>Nyelvek</Typography>
          {task.taskForLanguages.map((taskForLanguage: TaskForLanguageType, ind: number) => (
            <LanguageForm
              {...taskForLanguage}
              languageInd={ind}
              removeLanguage={() => removeLanguage(ind)}
              removeGroup={removeGroup}
              addNewGroup={addNewGroup}
              key={taskForLanguage.language || `language-${ind}`}
            />
          ))}
          <Button variant='contained' onClick={addLanguage}>Új nyelv</Button>

          <br />
          <br />
          <Button type='submit' variant='contained'>Mentés</Button>
        </CodyForm>
      </div>
    </div>
  );
};