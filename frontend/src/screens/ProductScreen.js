import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Grid,
  Image,
  List,
  Icon,
  Message,
  Select,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import Rating from "../components/Rating";
import Loader from "../components/Loader";
import { detailsProduct } from "../redux/actions/productActions";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(0);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(detailsProduct(match.params.id));
  }, [match.params.id, dispatch]);

  const itemInStock = [...Array(product.countInStock).keys()].map((x) => ({
    key: x + 1,
    value: x + 1,
    text: x + 1,
  }));

  const selectItemInStock = (e) => setQty(Number(e.target.textContent));

  const addToCart = (e) => {
    if (qty > 0) {
      history.push(`/cart/${match.params.id}?qty=${qty}`);
    } else {
      setShowError(true);
    }
  };

  const _handleDismiss = () => setShowError(false);

  const displayError = () =>
    showError && (
      <Message
        negative
        onDismiss={_handleDismiss}
        header="We're sorry we can't Add To Cart"
        content="You'r not Select any Qty."
      />
    );

  if (loading) {
    return <Loader text="Loading..." />;
  }

  if (error) {
    return <Message negative header="Error" content={error} />;
  }

  if (!product) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Button as={Link} to="/">
        Go Back
      </Button>
      {displayError()}
      <Grid>
        <Grid.Row>
          <Grid.Column mobile="16" tablet="8" computer="8">
            <Image
              src={product.image}
              alt={product.name}
              fluid
              style={{ padding: "1rem 0" }}
            />
          </Grid.Column>

          {/* Product Info */}
          <Grid.Column mobile="16" tablet="8" computer="4">
            <List divided relaxed style={{ padding: "1rem 0" }}>
              {/* Name Product */}
              <List.Item>
                <List.Content>
                  <h3>{product.name}</h3>
                </List.Content>
              </List.Item>

              {/* Rating */}
              <List.Item>
                <List.Content>
                  <Rating value={product.rating} reviews={product.numReviews} />
                </List.Content>
              </List.Item>

              {/* Price */}
              <List.Item>
                <List.Content>Price: ${product.price}</List.Content>
              </List.Item>

              {/* Description */}
              <List.Item>
                <List.Content>Description: {product.description}</List.Content>
              </List.Item>
            </List>
          </Grid.Column>

          {/* Cart */}
          <Grid.Column mobile="16" tablet="8" computer="4">
            <List celled relaxed style={{ padding: "1rem 0" }}>
              <List.Item>
                <List.Content>
                  <Grid.Row columns="2">
                    <Grid.Column floated="left">Price:</Grid.Column>
                    <Grid.Column floated="right">${product.price}</Grid.Column>
                  </Grid.Row>
                </List.Content>
              </List.Item>

              <List.Item>
                <List.Content>
                  <Grid.Row columns="2">
                    <Grid.Column floated="left">Status:</Grid.Column>
                    <Grid.Column floated="right">
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Grid.Column>
                  </Grid.Row>
                </List.Content>
              </List.Item>

              {product.countInStock > 0 && (
                <List.Item>
                  <List.Content>
                    <Grid.Row columns="2">
                      <Grid.Column floated="left">Qty:</Grid.Column>
                      <Grid.Column floated="right">
                        <Select
                          placeholder="Select your Qty"
                          onChange={selectItemInStock}
                          value={qty}
                          options={itemInStock}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </List.Content>
                </List.Item>
              )}

              <List.Item>
                <List.Content>
                  <Button
                    secondary
                    fluid
                    disabled={product.countInStock === 0}
                    onClick={addToCart}
                  >
                    <Icon name="cart arrow down" />
                    Add To Cart
                  </Button>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default ProductScreen;
