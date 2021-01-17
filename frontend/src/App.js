import React from "react";
import { Container } from "semantic-ui-react";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>Welcome App</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
