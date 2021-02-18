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

import { login } from "../redux/actions/userActions";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo && userInfo.length !== 0) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Grid style={{ height: "80vh" }} verticalAlign="middle" centered>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" color="black" textAlign="center">
          Sign In
        </Header>

        <Form
          onSubmit={submitHandler}
          loading={loading}
          success={error && error.length === 0}
          error={error && error.length !== 0}
        >
          {error && <Message error header="Connexion" content={error} />}

          {/* Email */}
          <Form.Input
            label="E-mail"
            type="email"
            onChange={(e, { value }) => setEmail(value)}
            required
          />

          {/* Password */}
          <Form.Input
            label="Password"
            type="password"
            onChange={(e, { value }) => setPassword(value)}
            required
          />

          <Button type="submit" color="black">
            Sign In
          </Button>
        </Form>

        <Divider />

        <p>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </p>
      </Grid.Column>
    </Grid>
  );
};

export default LoginScreen;
