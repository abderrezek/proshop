import React, { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";
import axios from "axios";

import Product from "../components/Product";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsApi = async () => {
      await axios
        .get("/api/products")
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };

    productsApi();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Card.Group>
        {products &&
          products.map((product, i) => <Product product={product} key={i} />)}
      </Card.Group>
    </>
  );
};

export default HomeScreen;
