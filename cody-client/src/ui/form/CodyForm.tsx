import { Form, Formik } from 'formik';
import { Children, cloneElement, isValidElement } from 'react';

interface CodyFormProps {
  model: any;
  disabled?: boolean;
  onSubmit?: (values: any) => void;
}

export const CodyForm: React.FC<CodyFormProps> = ({ children, model, disabled, onSubmit }) => {

  const handleSubmit = (values: any) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Formik initialValues={model} onSubmit={handleSubmit} enableReinitialize={true}>
      {({ dirty, resetForm, values }) => {
        return (
          <div className='cody-form-container'>
            <Form className='cody-form'>
              {Children.map(children, (child) => (
                isValidElement(child) ? cloneElement(child, { disabled, ...child.props }) : child
              ))}
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};