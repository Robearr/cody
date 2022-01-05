import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { ClassType, TaskForLanguageType, TestType } from "../types/Task";
import { ClassForm } from "./ClassForm";
import { CodyModal } from "./CodyModal";
import { TestForm } from "./TestForm";

interface LanguageFormProps {
  taskForLanguage: TaskForLanguageType;
};

export const LanguageForm: React.FC<LanguageFormProps> = ({ taskForLanguage }) => {

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
      taskForLanguage.classes.push(values as ClassType);
    } else {
      setClasses([...classes, values as ClassType]);
      taskForLanguage.tests.push(values as TestType);
    }

    setModalOpen(false);
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    formik.handleChange(ev);
    taskForLanguage.language = ev.target.value;
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField id='language' label='Feladat nyelve' value={formik.values.language} onChange={handleChange} />
      </form>

      <h1>Osztályok</h1>
      <Button variant='contained' onClick={() => createNew('class')}>Új osztály</Button>
      {classes.map((c: ClassType) => (
        <ClassForm data={c} key={c.className} />
      ))}

      <h1>Tesztek</h1>
      <Button variant='contained' onClick={() => createNew('test')}>Új teszt</Button>
      {tests.map((test: TestType) => (
        <TestForm data={test} key={test.className} />
      ))}

      <CodyModal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h1>{isTestModal ? 'Új teszt' : 'Új osztály'}</h1>
        {isTestModal ? <TestForm data={newData as TestType} addNew={addNew} /> : <ClassForm data={newData as ClassType} addNew={addNew} />}
      </CodyModal>
    </div>
  );
};