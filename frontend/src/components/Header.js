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
            <Menu.Item as={Link} to="/cart">
              <i className="fas fa-shopping-cart"></i> Cart
            </Menu.Item>
            {userInfo && userInfo.length !== 0 ? (
              <Dropdown
                item
                text={userInfo.name}
                pointing
                className="link item"
              >
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Menu.Item as={Link} to="/login">
                <i className="fas fa-user"></i> Sign In
              </Menu.Item>
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    </header>
  );
}

export default Header;
