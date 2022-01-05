import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import { TestType } from "../types/Task";

interface TestFormProps {
  data: TestType;
  addNew?: (values: TestType) => void;
};

export const TestForm: React.FC<TestFormProps> = ({ data, addNew }) => {

  const formik = useFormik({
    initialValues: data,
    onSubmit: (values) => {
      addNew(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField id='className' label='Osztály neve' value={formik.values.className} onChange={formik.handleChange} />
      <TextField id='classSource' label='Osztály forrása' value={formik.values.classSource} onChange={formik.handleChange} />
      <TextField id='testDescription' label='Teszt leírása' multiline value={formik.values.testDescription} onChange={formik.handleChange} />
      <TextField id='methodToCall' label='Meghívandó metódus' value={formik.values.methodToCall} onChange={formik.handleChange} />
      {/* <TextField id='methodParams' label='Osztály forrása' value={formik.values.methodParams} onChange={formik.handleChange} /> */}
      <FormControlLabel control={<Checkbox id='timingTest' value={formik.values.timingTest} onChange={formik.handleChange} />} label='Időmérő teszt' />
      {addNew ? <Button variant='contained' type='submit'>Hozzáadás</Button> : null}
    </form>
  );
};