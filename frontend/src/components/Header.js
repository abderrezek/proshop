import React from "react";
import { Link } from "react-router-dom";
import { Menu, Container, Dropdown } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/actions/userActions";

function Header() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Menu color="black" size="massive" borderless inverted>
        <Container>
          <Menu.Item as={Link} to="/" header>
            PROSHOP
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item
              as={Link}
              to="/cart"
              icon="shopping cart"
              content="Cart"
            />

            {userInfo && userInfo.length !== 0 ? (
              <Dropdown
                item
                text={userInfo.name}
                pointing
                className="link item"
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to="/profile"
                    icon="user circle"
                    content="Profile"
                  />

                  <Dropdown.Item
                    onClick={logoutHandler}
                    icon="sign-out"
                    content="Logout"
                  />
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Menu.Item
                as={Link}
                to="/login"
                icon="sign-in"
                content="Sign In"
              />
            )}
            {userInfo && userInfo.isAdmin && (
              <Dropdown text="Admin" className="link item" item pointing>
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to="/admin/users"
                    icon="users"
                    content="Users"
                  />

                  <Dropdown.Item
                    as={Link}
                    to="/admin/products"
                    content="Products"
                  />

                  <Dropdown.Item
                    as={Link}
                    to="/admin/orders"
                    content="Orders"
                  />
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    </header>
  );
}

export default Header;
