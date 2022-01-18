import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { ClassType, TaskForLanguageType, TestType } from "../types/Task";
import { ClassForm } from "./ClassForm";
import { CodyModal } from "./CodyModal";
import { TestForm } from "./TestForm";
import '../styles/form.scss';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface LanguageFormProps {
  taskForLanguage: TaskForLanguageType;
  removeLanguage: () => void;
};

export const LanguageForm: React.FC<LanguageFormProps> = ({ taskForLanguage, removeLanguage }) => {

  const [classes, setClasses] = useState<ClassType[]>([]);
  const [tests, setTests] = useState<TestType[]>([]);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isTestModal, setIsTestModal] = useState<boolean>(false);
  const [newData, setNewData] = useState<ClassType|TestType>(null);

  const formik = useFormik({
    initialValues: taskForLanguage,
    onSubmit: () => {},
  });

  const createNew = (type: string): void => {
    setModalOpen(true);
    setIsTestModal(type === 'test');

    if (type === 'test') {
      setNewData({
        className: '',
        classSource: '',
        testDescription: '',
        methodToCall: '',
        methodParams: {},
        timingTest: false
      });
    } else if (type === 'class') {
      setNewData({
        className: '',
        classSource: ''
      });
    }
  };

  const addNew = (values: TestType|ClassType): void => {
    if (isTestModal) {
      setTests([...tests, values as TestType]);
      taskForLanguage.tests.push(values as TestType);
    } else {
      setClasses([...classes, values as ClassType]);
      taskForLanguage.classes.push(values as ClassType);
    }

    setModalOpen(false);
  };

  const removeGroup = (group: 'test'|'class', ind: number) => {
    if (group === 'test') {
      setTests(tests.filter((_, i) => i !== ind));
      taskForLanguage.tests.splice(ind, 1);
    } else if (group === 'class') {
      setClasses(classes.filter((_, i) => i !== ind));
      taskForLanguage.classes.splice(ind, 1);
    }
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    formik.handleChange(ev);
    taskForLanguage.language = ev.target.value;
  };

  return (
    <div className='group'>
      <div className="flex space-between">
        <Typography variant='h5' sx={{ marginBottom: '1rem' }}>{taskForLanguage.language}</Typography>
        <FontAwesomeIcon icon={faTimes} onClick={removeLanguage} style={{ cursor: 'pointer' }}/>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <TextField id='language' label='Feladat nyelve' value={formik.values.language} onChange={handleChange} fullWidth />
      </form>

      <Typography variant="h6">Osztályok</Typography>

      {classes.map((c: ClassType, ind: number) => (
        <ClassForm data={c} key={c.className} removeGroup={() => removeGroup('class', ind)} />
      ))}

      <div className='flex flex-end'><Button variant='contained' onClick={() => createNew('class')}>Új osztály</Button></div>

      <Typography variant="h6">Tesztek</Typography>

      {tests.map((test: TestType, ind: number) => (
        <TestForm data={test} key={test.className} removeGroup={() => removeGroup('test', ind)} />
      ))}

      <div className='flex flex-end'><Button variant='contained' onClick={() => createNew('test')}>Új teszt</Button></div>

      <CodyModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <Typography variant='h4' sx={{ textAlign: 'center' }}>{isTestModal ? 'Új teszt' : 'Új osztály'}</Typography>
        {isTestModal ? <TestForm data={newData as TestType} addNew={addNew} /> : <ClassForm data={newData as ClassType} addNew={addNew} />}
      </CodyModal>
    </div>
  );
};