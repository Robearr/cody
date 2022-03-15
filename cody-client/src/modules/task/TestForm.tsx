import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputField } from '../../ui/form/InputField';

interface TestFormProps {
  attrPrefix: string;
  ind: number;
  removeGroup?: () => void;
};

export const TestForm: React.FC<TestFormProps> = ({ attrPrefix, ind, removeGroup }) => {

  return (
    <>
      {removeGroup ? <FontAwesomeIcon icon={faTimes} onClick={removeGroup} style={{ cursor: 'pointer' }} className='float-right margin-bottom' /> : null}
      <InputField attr={`${attrPrefix}.tests.${ind}.className`} label='Osztály neve' />
      <InputField attr={`${attrPrefix}.tests.${ind}.classSource`} label='Osztály forrása' type='textarea' />
      <InputField attr={`${attrPrefix}.tests.${ind}.testDescription`} label='Teszt leírása' type='textarea' />
      <InputField attr={`${attrPrefix}.tests.${ind}.methodToCall`} label='Meghívandó metódus' />
      {/* <InputField attr={`${attrPrefix}.tests.${ind}.methodParams`} label='Osztály neve' /> */}
      <InputField attr={`${attrPrefix}.tests.${ind}.timingTest`} label='Időmérő teszt' type='checkbox' />
    </>
  );
};