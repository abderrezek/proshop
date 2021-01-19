import React from "react";
import { Card } from "semantic-ui-react";

import Product from "../components/Product";
import products from "../data/products";

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Card.Group>
        {products.map((product, i) => (
          <Product product={product} key={i} />
        ))}
      </Card.Group>
    </>
  );
};

export default HomeScreen;
