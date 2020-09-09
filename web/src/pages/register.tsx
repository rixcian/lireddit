import React from 'react';
import {Form, Formik} from 'formik';
import {Input, FormLabel, FormControl, FormErrorMessage} from "@chakra-ui/core";

import PageWrapper from '../components/PageWrapper';
import InputField from "../components/InputField";
import {Button} from "@chakra-ui/core/dist";
import { useMutation } from 'urql';


interface RegisterProps {}

const REGISTER_MUT = `
mutation Register($username: String!, $email: String!, $password: String!) {
  register(inputs: {username: $username, email: $email, password: $password}) {
    user {
      id,
      username,
      email
    },
    errors {
      field,
      message
    }
  }
}
`

const Register: React.FC<RegisterProps> = ({}) => {

  const [,register] = useMutation(REGISTER_MUT);

  return (
    <PageWrapper variant="regular">
      <Formik
        initialValues={{username: '', email: '', password: ''}}
        onSubmit={values => {
          console.log(values);
          register(values);
        }}
      >
        {(values, handleChange, isSubmitting) => (
          <Form>
            <InputField
              label="Username"
              name="username"
              placeholder="Username"
              type="text"
            />
            <InputField
              label="Email"
              name="email"
              placeholder="Email"
              type="email"
            />
            <InputField
              label="Password"
              name="password"
              placeholder="Password"
              type="password"
            />
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  )

};

export default Register;