import React, { useEffect, useState } from "react";
import {
  Loader,
  Message,
  Header,
  Table,
  Button,
  Icon,
  Confirm,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { listUsers, deleteUser } from "../redux/actions/userActions";

const UserListScreen = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [showMsg, setShowMsg] = useState(false);

  const dispatch = useDispatch();

  const { loading, users, error } = useSelector((state) => state.userList);

  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    loading: loadDelete,
    error: errDelete,
    success,
    message: msgDelete,
  } = useSelector((state) => state.userDelete);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, success]);

  // MAke time for hidden message & clear it
  useEffect(() => {
    let timer = setTimeout(() => {
      setShowMsg(false);
    }, 3000);

    return () => clearInterval(timer);
  }, [msgDelete]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
    setShowMsg(true);
    setOpen(false);
  };

  if (loading) {
    return <Loader text="Loading..." />;
  }

  if (error) {
    return <Message negative header="Error" content={error} />;
  }

  return (
    <>
      <Header as="h1" color="black" textAlign="center">
        My Orders
      </Header>

      {errDelete && (
        <Message negative header="Delete User" content={errDelete} />
      )}
      {msgDelete && msgDelete.message && showMsg && (
        <Message positive header="Delete User" content={msgDelete.message} />
      )}

      <Table loading={loading ? "true" : "false"} size="small" celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Admin</Table.HeaderCell>
            <Table.HeaderCell>ACTIONS</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users &&
            users.map((user, index) => (
              <Table.Row key={index}>
                <Table.Cell>{user._id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </Table.Cell>
                <Table.Cell>
                  {user.isAdmin ? (
                    <Icon name="check" color="green" />
                  ) : (
                    <Icon name="times" color="red" />
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    as={Link}
                    to={`/admin/user/${user._id}/edit`}
                    size="small"
                    icon="edit"
                    color="blue"
                  />
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setIdUser(user._id);
                    }}
                    loading={idUser === user._id && loadDelete}
                    size="small"
                    icon="trash alternate"
                    color="red"
                  />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>

        {/* <Table.Footer>
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
        </Table.Footer> */}
      </Table>

      <Confirm
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={() => deleteHandler(idUser)}
      />
    </>
  );
};

export default UserListScreen;
