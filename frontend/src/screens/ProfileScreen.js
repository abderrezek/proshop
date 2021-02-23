import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Grid, Header, Message } from "semantic-ui-react";

import { userActionsTypes } from "../redux/actions/actionsTypes";
import {
  getUserDetails,
  updateUserProfile,
} from "../redux/actions/userActions";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    loading: loadUpdate,
    userInfo: userInfoUpdate,
    error: errUpdate,
    success,
  } = useSelector((state) => state.userUpdateProfile);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: userActionsTypes.USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      let userUpdate = { name, email };
      if (password !== "") {
        userUpdate.password = password;
      }
      dispatch(updateUserProfile(userUpdate));
    }
  };

  return (
    <Grid style={{ height: "80vh" }} verticalAlign="middle" centered>
      {/* Profile */}
      <Grid.Column mobile={16} tablet={8} computer={6} largeScreen={8}>
        <Header as="h2" color="black" textAlign="center">
          User Profile
        </Header>

        <Form
          onSubmit={submitHandler}
          loading={loading}
          success={
            (error && error.length !== 0) ||
            (message && message === "") ||
            success
          }
          error={
            (error && error.length !== 0) ||
            (message && message !== "") ||
            (errUpdate && errUpdate !== "")
          }
        >
          {message && <Message error header="Password" content={message} />}
          {success && (
            <Message
              positive
              header="Update Profile"
              content="Profile Updated"
            />
          )}
          {error && <Message error header="Connexion" content={error} />}
          {errUpdate && <Message error header="Update" content={errUpdate} />}

          {/* Name */}
          <Form.Input
            name="name"
            label="Name"
            type="text"
            value={name}
            onChange={(e, { value }) => setName(value)}
            required
          />

          {/* Email */}
          <Form.Input
            name="email"
            label="E-mail"
            type="email"
            value={email}
            onChange={(e, { value }) => setEmail(value)}
            required
          />

          {/* Password */}
          <Form.Input
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e, { value }) => setPassword(value)}
          />

          {/* Password Confirmation */}
          <Form.Input
            name="passwordConfirmation"
            label="Password Confirmation"
            type="password"
            value={confirmPassword}
            onChange={(e, { value }) => setConfirmPassword(value)}
          />

          <Button type="submit" color="black">
            Update
          </Button>
        </Form>
      </Grid.Column>

      {/* Orders */}
      <Grid.Column mobile={16} tablet={8} computer={10} largeScreen={8}>
        <Header as="h1" color="black" textAlign="center">
          My Orders
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default ProfileScreen;
