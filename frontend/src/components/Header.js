import React from "react";
import { Link } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

function Header() {
  return (
    <header>
      <Menu color="black" size="massive" borderless inverted>
        <Container>
          <Menu.Item as={Link} to="/" header>
            PROSHOP
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/cart">
              <i className="fas fa-shopping-cart"></i>
              Cart
            </Menu.Item>
            <Menu.Item as={Link} to="/login">
              <i className="fas fa-user"></i>
              Sign In
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </header>
  );
}

export default Header;
