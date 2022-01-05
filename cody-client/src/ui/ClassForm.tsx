import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { ClassType } from "../types/Task";

interface ClassFormProps {
  data: ClassType;
  addNew?: (values: ClassType) => void;
};

export const ClassForm: React.FC<ClassFormProps> = ({ data, addNew }) => {

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
      {addNew ? <Button variant='contained' type='submit'>Hozzáadás</Button> : null}
    </form>
  );
};