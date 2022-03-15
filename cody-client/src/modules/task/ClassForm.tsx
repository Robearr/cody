import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputField } from '../../ui/form/InputField';
interface ClassFormProps {
  attrPrefix: string;
  ind: number;
  removeGroup?: () => void;
};

export const ClassForm: React.FC<ClassFormProps> = ({ attrPrefix, ind, removeGroup }) => {

  return (
    <>
      {removeGroup ? <FontAwesomeIcon icon={faTimes} onClick={removeGroup} style={{ cursor: 'pointer' }} className='float-right margin-bottom' /> : null}
      <InputField attr={`${attrPrefix}.classes.${ind}.className`} label='Osztály neve' />
      <InputField attr={`${attrPrefix}.classes.${ind}.classSource`} label='Osztály forrása' type='textarea' />
    </>
  );
};