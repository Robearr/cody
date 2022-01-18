import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { ClassType } from "../types/Task";

interface ClassFormProps {
  data: ClassType;
  addNew?: (values: ClassType) => void;
  removeGroup?: () => void;
};

export const ClassForm: React.FC<ClassFormProps> = ({ data, addNew, removeGroup }) => {

  const formik = useFormik({
    initialValues: data,
    onSubmit: (values) => {
      addNew(values);
    }
  });

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    formik.handleChange(ev);
    data[ev.target.id] = ev.target.value;
  };

  return (
    <form onSubmit={formik.handleSubmit} className='group margin-top'>
      {removeGroup ? <FontAwesomeIcon icon={faTimes} onClick={removeGroup} style={{ cursor: 'pointer' }} className='float-right margin-bottom'/> : null}
      <TextField id='className' label='Osztály neve' value={formik.values.className} onChange={handleChange} fullWidth />
      <TextField id='classSource' label='Osztály forrása' value={formik.values.classSource} onChange={handleChange} fullWidth multiline rows={2} />
      {addNew ? <Button variant='contained' type='submit' className='float-right'>Hozzáadás</Button> : null}
    </form>
  );
};