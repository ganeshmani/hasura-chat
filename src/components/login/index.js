import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box
} from "@chakra-ui/core";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { loginUser } from "../../store/user/action";

const Login = ({ loginUser, history }) => {
  const [state, setState] = useState({
    name: "",
    password: ""
  });
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
    loginUser({
      username: state.name,
      password: state.password
    });

    setState({ name: "", password: "" });

    history.push("/chat");
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

const mapStateToProps = state => ({});

const dispatchActionToProps = dispatch => ({
  loginUser: bindActionCreators(loginUser, dispatch)
});

export default connect(mapStateToProps, dispatchActionToProps)(Login);
