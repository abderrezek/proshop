import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Grid, Image, List, Icon } from "semantic-ui-react";
import axios from "axios";

import Rating from "../components/Rating";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const productApi = async () => {
      await axios
        .get(`/api/products/${match.params.id}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };

    productApi();
  }, [match.params.id]);

  if (!product) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Button as={Link} to="/">
        Go Back
      </Button>
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
                <List.Content>Description: ${product.description}</List.Content>
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

              <List.Item>
                <List.Content>
                  <Button secondary fluid disabled={product.countInStock === 0}>
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
