import React, { useEffect } from "react";
import { Card, Message } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import Product from "../components/Product";
import Loader from "../components/Loader";
import { listProducts } from "../redux/actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader text="Loading..." />
      ) : error ? (
        <Message negative header="Error" content={error} />
      ) : (
        <Card.Group>
          {products &&
            products.map((product, i) => <Product product={product} key={i} />)}
        </Card.Group>
      )}
    </>
  );
};

export default HomeScreen;
