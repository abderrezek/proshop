import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Header,
  Message,
  Item,
  Segment,
  List,
  Select,
  Button,
  Icon,
} from "semantic-ui-react";

import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const CartScreen = ({ match, location }) => {
  const { id } = match.params;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const history = useHistory();

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => dispatch(removeFromCart(id));

  const checkoutHandler = () => history.push("/login?redirect=shipping");

  return (
    <Grid columns={3} container>
      <Grid.Row>
        <Grid.Column computer={10}>
          <Header as="h1">Shopping Cart</Header>
          {cartItems.length === 0 ? (
            <Message info>
              Your cart is empty{" "}
              <Link style={{ color: "#000" }} to="/">
                Go Back
              </Link>
            </Message>
          ) : (
            <Item.Group>
              {cartItems.map((item) => (
                <Item key={item.product}>
                  <Item.Image size="small" src={item.image} />

                  <Item.Content>
                    {/* Name Product */}
                    <Item.Header>{item.name}</Item.Header>

                    {/* Price Product */}
                    <Item.Meta>
                      <span className="price">${item.price}</span>
                    </Item.Meta>

                    {/* Actions Select - Remove */}
                    <Item.Extra>
                      <Select
                        value={item.qty}
                        placeholder="Select your Qty"
                        onChange={(e) =>
                          dispatch(
                            addToCart(
                              item.product,
                              Number(e.target.textContent)
                            )
                          )
                        }
                        options={[...Array(item.countInStock).keys()].map(
                          (x) => ({
                            key: x + 1,
                            value: x + 1,
                            text: x + 1,
                          })
                        )}
                      />
                      <Button
                        onClick={(e) => removeFromCartHandler(item.product)}
                        icon
                      >
                        <Icon name="trash" />
                      </Button>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              ))}
            </Item.Group>
          )}
        </Grid.Column>
        <Grid.Column computer={6}>
          <Segment.Group>
            <Segment>
              <List>
                <List.Item>
                  <Header as="h2">
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </Header>
                </List.Item>
                <List.Item>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </List.Item>
              </List>
            </Segment>
            <Segment>
              <Button
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                secondary
                fluid
              >
                Proceed To Checkout
              </Button>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CartScreen;
