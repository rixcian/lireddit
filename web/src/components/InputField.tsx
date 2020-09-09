import React from 'react';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/core';
import {useField} from "formik";

type InputFieldProps  =  React.InputHTMLAttributes<HTMLInputElement> & {
  label: string,
  placeholder?: string,
  name: string,
};

const InputField: React.FC<InputFieldProps> = (props) => {

  const [field, {error}] = useField(props);

  return (
    <FormControl isInvalid={!!error} style={{ margin: '1rem 0' }}>
      <FormLabel htmlFor="name">{props.label}</FormLabel>
      <Input {...field} id={field.name} placeholder={props.placeholder} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );

};

export default InputField;