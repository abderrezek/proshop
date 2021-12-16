import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Grid, Header, Message, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { userActionsTypes } from "../redux/actions/actionsTypes";
import { detailsProduct } from "../redux/actions/productActions";

const ProductEditScreen = ({ location, history, match }) => {
  const productId = match.params.id;
  const [data, setData] = useState({
    name: "",
    price: 0,
    brand: "",
    category: "",
    countInStock: 0,
    numReviews: 0,
    description: "",
  });

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push("/login");
    }

    dispatch(detailsProduct(productId));
  }, [dispatch, history, productId, userInfo]);

  useEffect(() => {
    setData({
      name: product.name,
      price: product.price,
      brand: product.brand,
      category: product.category,
      countInStock: product.countInStock,
      numReviews: product.numReviews,
      description: product.description,
    });
  }, [product]);

  const submitHandler = () => {};

  const onChange = () => {};

  if (loading) {
    return <Loader text="Loading..." />;
  }

  if (error) {
    return <Message negative header="Error" content={error} />;
  }

  return (
    <Grid style={{ height: "80vh" }} verticalAlign="middle" centered>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Button
          as={Link}
          to="/admin/products"
          icon="chevron left"
          size="mini"
        />

        <Header as="h1" color="black" textAlign="center">
          Edit Product
        </Header>

        <Form onSubmit={submitHandler} loading={loading}>
          {/* {message && <Message error header="Password" content={message} />} */}
          {error && <Message error header="Connexion" content={error} />}

          {/* Name */}
          <Form.Input
            name="name"
            label="Name"
            type="text"
            onChange={onChange}
            defaultValue={data && data.name}
            required
          />

          {/* Price */}
          <Form.Input
            name="price"
            label="Price"
            type="text"
            onChange={onChange}
            defaultValue={data && data.price}
            required
          />

          {/* Brand */}
          <Form.Input
            name="brand"
            label="Brand"
            type="text"
            onChange={onChange}
            defaultValue={data && data.brand}
            required
          />

          {/* Category */}
          <Form.Input
            name="category"
            label="Category"
            type="text"
            onChange={onChange}
            defaultValue={data && data.category}
            required
          />

          {/* Count In Stock */}
          <Form.Input
            name="countInStock"
            label="Count In Stock"
            type="text"
            onChange={onChange}
            defaultValue={data && data.countInStock}
            required
          />

          {/* numReviews */}
          <Form.Input
            name="numReviews"
            label="Reviews"
            type="text"
            onChange={onChange}
            defaultValue={data && data.numReviews}
            required
          />

          {/* Description */}
          <Form.TextArea
            name="description"
            label="Description"
            type="text"
            onChange={onChange}
            defaultValue={data && data.description}
            required
          />

          <Button type="submit" color="black">
            Update
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default ProductEditScreen;
