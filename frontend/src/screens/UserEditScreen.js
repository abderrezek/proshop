import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Grid, Header, Message, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { userActionsTypes } from "../redux/actions/actionsTypes";
import { getUserDetail, updateUser } from "../redux/actions/userActions";

const UserEditScreen = ({ location, history, match }) => {
  const userId = match.params.id;
  const [data, setData] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });

  const dispatch = useDispatch();

  const { loading: loadUser, user, error: errUser } = useSelector(
    (state) => state.userDetails
  );
  const { loading, success, error } = useSelector((state) => state.userUpdate);

  useEffect(() => {
    if (success) {
      dispatch({ type: userActionsTypes.USER_UPDATE_RESET });
      dispatch({ type: userActionsTypes.USER_DETAILS_RESET });
      history.push("/admin/users");
    } else {
      if (user == null || user._id !== userId) {
        dispatch(getUserDetail(userId));
      } else {
        setData({
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      }
    }
  }, [dispatch, user, history, userId, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (data.name !== "" && data.email !== "") {
      dispatch(updateUser(userId, data));
    }
  };

  const onChange = (e, { name, value }) =>
    setData((state) => ({ ...state, [e.target.name]: value }));

  if (loadUser) {
    return <Loader text="Loading..." />;
  }

  return (
    <Grid style={{ height: "80vh" }} verticalAlign="middle" centered>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Button as={Link} to="/admin/users" icon="chevron left" size="mini" />

        <Header as="h1" color="black" textAlign="center">
          Edit User
        </Header>

        <Form
          onSubmit={submitHandler}
          loading={loading}
          // success={(error && error.length !== 0) || (message && message === "")}
          // error={(error && error.length !== 0) || (message && message !== "")}
        >
          {/* {message && <Message error header="Password" content={message} />} */}
          {error && <Message error header="Connexion" content={error} />}

          {/* Name */}
          <Form.Input
            name="name"
            label="Name"
            type="text"
            onChange={onChange}
            defaultValue={user && user.name}
            required
          />

          {/* Email */}
          <Form.Input
            name="email"
            label="E-mail"
            type="email"
            onChange={onChange}
            defaultValue={user && user.email}
            required
          />

          {/* Admin */}
          <Form.Checkbox
            name="isAdmin"
            label="is admin ?"
            type="checkbox"
            onChange={() => setData((ps) => ({ ...ps, isAdmin: !ps.isAdmin }))}
            defaultChecked={user && user.isAdmin}
            required
          />

          <Button type="submit" color="black">
            Update
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default UserEditScreen;
