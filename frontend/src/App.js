import React from "react";
import { Container } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import NotFound from "./screens/404";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} exact />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
