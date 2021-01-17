import React from "react";
import { Container, Grid } from "semantic-ui-react";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Grid>
          <Grid.Column textAlign="center">Copyright &copy; ProShop</Grid.Column>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
