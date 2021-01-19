import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card centered as={Link} to={`/product/${product._id}`}>
      <Image src={product.image} wrapped ui={false} />

      <Card.Content as="h2" header={product.name} />

      <Card.Content extra>
        <Rating value={product.rating} reviews={product.numReviews} />
      </Card.Content>

      <Card.Content as="h3" header={`$${product.price}`} />
    </Card>
  );
};

export default Product;
