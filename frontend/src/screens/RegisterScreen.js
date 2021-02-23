import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Message,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import { register } from "../redux/actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const { loading, userInfo, error } = useSelector(
    (state) => state.userRegister
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo && userInfo.length !== 0) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (data.password !== data.passwordConfirmation) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      dispatch(register(data.name, data.email, data.password));
    }
  };

  const onChange = (e, { name, value }) =>
    setData((state) => ({ ...state, [e.target.name]: value }));

  return (
    <Grid style={{ height: "80vh" }} verticalAlign="middle" centered>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="black" textAlign="center">
          Sign Up
        </Header>

        <Form
          onSubmit={submitHandler}
          loading={loading}
          success={(error && error.length !== 0) || (message && message === "")}
          error={(error && error.length !== 0) || (message && message !== "")}
        >
          {message && <Message error header="Password" content={message} />}
          {error && <Message error header="Connexion" content={error} />}

          {/* Name */}
          <Form.Input
            name="name"
            label="Name"
            type="text"
            onChange={onChange}
            required
          />

          {/* Email */}
          <Form.Input
            name="email"
            label="E-mail"
            type="email"
            onChange={onChange}
            required
          />

          {/* Password */}
          <Form.Input
            name="password"
            label="Password"
            type="password"
            onChange={onChange}
            required
          />

          {/* Password Confirmation */}
          <Form.Input
            name="passwordConfirmation"
            label="Password Confirmation"
            type="password"
            onChange={onChange}
            required
          />

          <Button type="submit" color="black">
            Sign Up
          </Button>
        </Form>

        <Divider />

        <p>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </p>
      </Grid.Column>
    </Grid>
  );
};

export default RegisterScreen;
