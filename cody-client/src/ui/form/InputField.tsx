import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import DayjsUtils from '@date-io/dayjs';
import { Checkbox, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import { Field } from 'formik';
import dayjs from 'dayjs';

interface InputFieldProps {
  type?: 'number' | 'date' | 'select' | 'checkbox' | 'textarea' | 'switch';
  label: string;
  attr: string;
  valueOverride?: string;
  disabled?: boolean;
  ctValues?: string[];
  afterChange?: (value: any) => void;
}

const getDefaultValueForType = (type: string | undefined) => {
  if (type === 'number') {
    return 0;
  }

  return '';
};

export const InputField: React.FC<InputFieldProps> = ({ type, label, attr, valueOverride, disabled, ctValues, afterChange }) => {

  const getInputComponent = (field) => {
    if (type === 'date') {
      return (
        <>
          <InputLabel>{label}</InputLabel>
          <LocalizationProvider dateAdapter={DayjsUtils}>
            <DesktopDatePicker
              inputFormat='YYYY-MM-DD'
              mask='____-__-__'
              value={field.value}
              onChange={(value) => field.onChange({
                target: {
                  value: dayjs(value).format('YYYY-MM-DD'),
                  name: field.name
                }
              })}
              renderInput={(props) => <TextField className='field-datepicker form-field' {...props} />}
              disabled={disabled}
            />
          </LocalizationProvider>
        </>
      );
    }

    if (type === 'select' && ctValues) {
      const handleSelect = (e) => {
        field.onChange(e);
        if (afterChange) {
          afterChange(e.target.value);
        }
      };

      return (
        <>
          <InputLabel id={field.value}>{label}</InputLabel>
          <Select
            className='field-select form-field'
            labelId={field.value}
            name={field.name}
            value={field.value ?? ''}
            defaultValue={''}
            onChange={handleSelect}
            disabled={disabled}
          >
            {ctValues.map((item) => (
              <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </>
      );
    }

    if (type === 'checkbox') {
      return (
        <FormControlLabel
          className='field-checkbox form-field'
          label={label}
          control={
            <Checkbox
              name={field.name}
              checked={valueOverride === 'true' || field.value === 'true' || field.value === true}
              onChange={(event) => field.onChange({
                target: {
                  value: event.target.checked,
                  name: field.name
                }
              })}
              disabled={disabled}
            />
          }
        />
      );
    }

    if (type === 'switch') {
      return (
        <FormControlLabel
          className='field-switch form-field'
          label={label}
          control={<Switch
            name={field.name}
            color='success'
            checked={field.value === 'true' || field.value === true}
            onChange={(event) => field.onChange({
              target: {
                value: event.target.checked,
                name: field.name
              }
            })}
            disabled={disabled}
          />}
        />

      );
    }

    return (
      <>
        <InputLabel>{label}</InputLabel>
        <TextField
          className='field-text form-field'
          type={type}
          multiline={type === 'textarea'}
          minRows={type === 'textarea' ? '2' : undefined}
          name={field.name}
          value={valueOverride ?? field.value ?? getDefaultValueForType(type)}
          onChange={field.onChange}
          disabled={disabled}
          key={`input-field-${attr}`}
        />
      </>
    );
  };

  return (
    <div className="input-container">
      <Field name={attr}>
        {({ field }) => getInputComponent(field)}
      </Field>
    </div>
  );
};