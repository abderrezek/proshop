import React from "react";
import { Menu, Container } from "semantic-ui-react";

function Header() {
  return (
    <header>
      <Menu color="black" size="massive" borderless inverted>
        <Container>
          <Menu.Item as="a" href="/" header>
            PROSHOP
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item as="a" href="/cart">
              <i className="fas fa-shopping-cart"></i>
              Cart
            </Menu.Item>
            <Menu.Item as="a" href="/login">
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
