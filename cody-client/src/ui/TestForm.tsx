import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import { TestType } from "../types/Task";

interface TestFormProps {
  data: TestType;
  addNew?: (values: TestType) => void;
  removeGroup?: () => void;
};

export const TestForm: React.FC<TestFormProps> = ({ data, addNew, removeGroup }) => {

  const formik = useFormik({
    initialValues: data,
    onSubmit: (values) => {
      addNew(values);
    }
  });

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    formik.handleChange(ev);

    if (ev.target.type === 'checkbox') {
      data[ev.target.id] = ev.target.checked;
    } else {
      data[ev.target.id] = ev.target.value;
    }

  };

  return (
    <form onSubmit={formik.handleSubmit} className='group margin-top'>
      {removeGroup ? <FontAwesomeIcon icon={faTimes} onClick={removeGroup} style={{ cursor: 'pointer' }} className='float-right margin-bottom'/> : null}
      <TextField id='className' label='Osztály neve' value={formik.values.className} onChange={handleChange} fullWidth />
      <TextField id='classSource' label='Osztály forrása' value={formik.values.classSource} onChange={handleChange} fullWidth multiline rows={2} />
      <TextField id='testDescription' label='Teszt leírása' value={formik.values.testDescription} onChange={handleChange} fullWidth multiline rows={2} />
      <TextField id='methodToCall' label='Meghívandó metódus' value={formik.values.methodToCall} onChange={handleChange} fullWidth />
      {/* <TextField id='methodParams' label='Osztály forrása' value={formik.values.methodParams} onChange={handleChange} /> */}
      <FormControlLabel control={<Checkbox id='timingTest' value={formik.values.timingTest} onChange={handleChange} />} label='Időmérő teszt' />
      {addNew ? <Button variant='contained' type='submit' className='float-right'>Hozzáadás</Button> : null}
    </form>
  );
};