import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Table,
  Menu,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import { userActionsTypes } from "../redux/actions/actionsTypes";
import {
  getUserDetails,
  updateUserProfile,
} from "../redux/actions/userActions";
import { listMyOrders } from "../redux/actions/orderActions";

const ProfileScreen = ({ match, location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    loading: loadUpdate,
    userInfo: userInfoUpdate,
    error: errUpdate,
    success,
  } = useSelector((state) => state.userUpdateProfile);
  const {
    loading: loadOrders,
    error: errOrders,
    orders: ordersData,
  } = useSelector((state) => state.orderListMy);

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

  useEffect(() => {
    dispatch(listMyOrders(page, limit));
  }, [dispatch, page, limit]);

  useEffect(() => {
    if (match.params.page) {
      if (match.params.page > 0) {
        setPage(parseInt(match.params.page));
      } else {
        history.push(`/profile/${match.params.page * -1}`);
      }
    }
  }, [match.params.page, history]);

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

  const nextPage = () => {
    let p = (page + 1) % ordersData.pages;
    setPage(p);
    history.push(`/profile/${p}`);
  };

  const prevPage = () => {
    let p = (page - 1) % ordersData.pages;
    setPage(p);
    history.push(`/profile/${p}`);
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
        {errOrders ? (
          <Message negative content={errOrders} />
        ) : (
          <Table loading={loadOrders ? "true" : "false"} size="small" celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>DATE</Table.HeaderCell>
                <Table.HeaderCell>TOTAL</Table.HeaderCell>
                <Table.HeaderCell>PAID</Table.HeaderCell>
                <Table.HeaderCell>DELIVERED</Table.HeaderCell>
                <Table.HeaderCell>ACTIONS</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {ordersData &&
                ordersData.orders &&
                ordersData.orders.map((order, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{order._id}</Table.Cell>
                    <Table.Cell>{order.createdAt.substring(0, 10)}</Table.Cell>
                    <Table.Cell>{order.totalPrice}</Table.Cell>
                    <Table.Cell>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        as={Link}
                        to={`/order/${order._id}`}
                        size="small"
                        content="Details"
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="6">
                  <Menu floated="right" pagination>
                    {ordersData && ordersData.pages > 1 && (
                      <Menu.Item as="a" onClick={prevPage} icon>
                        <Icon name="chevron left" />
                      </Menu.Item>
                    )}

                    {ordersData &&
                      ordersData.pages &&
                      Array.from(Array(ordersData.pages).keys()).map((p) => (
                        <Menu.Item
                          active={p + 1 === page}
                          as={Link}
                          to={`/profile/${p + 1}`}
                          key={p}
                        >
                          {p + 1}
                        </Menu.Item>
                      ))}

                    {ordersData && ordersData.pages > 1 && (
                      <Menu.Item as="a" onClick={nextPage} icon>
                        <Icon name="chevron right" />
                      </Menu.Item>
                    )}
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ProfileScreen;
