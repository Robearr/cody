import { Button, Typography } from "@mui/material";
import React from "react";
import { ClassType, TestType } from "../../types/task/Task";
import { ProgrammingLanguage } from '../../types/task/ProgrammingLanguage';
import { ClassForm } from "../../modules/task/ClassForm";
import { TestForm } from "../../modules/task/TestForm";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputField } from '../../ui/form/InputField';
import { useTranslation } from 'react-i18next';

import '../../styles/form.scss';

interface LanguageFormProps {
  language: string;
  classes: ClassType[];
  tests: TestType[];
  languageInd: number;
  removeLanguage: () => void;
  removeGroup: (group: 'test' | 'class', ind: number) => void;
  addNewGroup: (group: 'test' | 'class') => void;
};

export const LanguageForm: React.FC<LanguageFormProps> = ({ language, classes, tests, languageInd, removeLanguage, removeGroup, addNewGroup }) => {

  const { t } = useTranslation();

  return (
    <div className='group'>
      <div className="flex space-between">
        <Typography variant='h5' sx={{ marginBottom: '1rem' }}>{language}</Typography>
        <FontAwesomeIcon icon={faTimes} onClick={removeLanguage} style={{ cursor: 'pointer' }}/>
      </div>

      <InputField attr={`taskForLanguages.${languageInd}.language`} label={t('task.language')} type='select' ctValues={Object.keys(ProgrammingLanguage)} />

      <Typography variant="h6">Osztályok</Typography>
      {classes.map((c: ClassType, ind: number) => (
        <ClassForm key={c.className || `class-${ind}`} attrPrefix={`taskForLanguages.${languageInd}`} ind={ind} removeGroup={() => removeGroup('class', ind)} />
      ))}
      <div className='flex flex-end'><Button variant='contained' onClick={() => addNewGroup('class')}>{t('task.newClass')}</Button></div>

      <Typography variant="h6">Tesztek</Typography>
      {tests.map((test: TestType, ind: number) => (
        <TestForm key={test.className || `test-${ind}`} attrPrefix={`taskForLanguages.${languageInd}`} ind={ind} removeGroup={() => removeGroup('test', ind)} />
      ))}
      <div className='flex flex-end'><Button variant='contained' onClick={() => addNewGroup('test')}>{t('task.newTest')}</Button></div>
    </div>
  );
};