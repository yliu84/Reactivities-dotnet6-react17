import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import { useField } from 'formik';

interface Props {
  placeholder: string;
  name: string;
  type?: string;
  label?: string;
}

const MyTextInput = (props: Props) => {
  const [field, meta] = useField(props.name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label pointing basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default MyTextInput;
