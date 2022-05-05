import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputField } from '../../ui/form/InputField';
import { useTranslation } from 'react-i18next';

interface TestFormProps {
  attrPrefix: string;
  ind: number;
  removeGroup?: () => void;
};

export const TestForm: React.FC<TestFormProps> = ({ attrPrefix, ind, removeGroup }) => {

  const { t } = useTranslation();

  return (
    <>
      {removeGroup ? <FontAwesomeIcon icon={faTimes} onClick={removeGroup} style={{ cursor: 'pointer' }} className='float-right margin-bottom' /> : null}
      <InputField attr={`${attrPrefix}.tests.${ind}.className`} label={t('task.className')} />
      <InputField attr={`${attrPrefix}.tests.${ind}.classSource`} label={t('task.classSource')} type='textarea' />
      <InputField attr={`${attrPrefix}.tests.${ind}.testDescription`} label={t('task.testDescription')} type='textarea' />
      <InputField attr={`${attrPrefix}.tests.${ind}.methodToCall`} label={t('task.methodToCall')} />
      {/* <InputField attr={`${attrPrefix}.tests.${ind}.methodParams`} label='Osztály neve' /> */}
      <InputField attr={`${attrPrefix}.tests.${ind}.timingTest`} label={t('task.timingTest')} type='checkbox' />
    </>
  );
};