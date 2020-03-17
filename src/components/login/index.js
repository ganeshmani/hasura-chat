import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box
} from "@chakra-ui/core";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const LOGIN_USER = gql`
  mutation InsertUsers($name: String!, $password: String!) {
    insert_users(objects: { name: $name, password: $password }) {
      returning {
        id
        name
      }
    }
  }
`;

const Login = ({ history }) => {
  const [state, setState] = useState({
    name: "",
    password: ""
  });

  const [insert_users, { data }] = useMutation(LOGIN_USER);

  useEffect(() => {
    const user = data && data.insert_users.returning[0];
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      history.push("/chat");
    }
  }, [data]);
  const { handleSubmit, errors, register, formState } = useForm();

  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error || true;
  }

  function validatePassword(value) {
    let error;
    if (value.length <= 4) {
      error = "Password should be 6 digit long";
    }

    return error || true;
  }

  const onInputChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    insert_users({ variables: { name: state.name, password: state.password } });

    setState({ name: "", password: "" });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            name="name"
            placeholder="name"
            onChange={onInputChange}
            ref={register({ validate: validateName })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="name">Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            onChange={onInputChange}
            ref={register({ validate: validatePassword })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          variantColor="teal"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Login;
