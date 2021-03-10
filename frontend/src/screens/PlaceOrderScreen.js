import React, { useEffect } from "react";
import { Button, Grid, Item, Message, Segment } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { createOrder } from "../redux/actions/orderActions";
import {
  orderActionsTypes,
  userActionsTypes,
} from "../redux/actions/actionsTypes";
import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);
  const dispatch = useDispatch();

  const { order, success, error, loading } = useSelector(
    (state) => state.orderCreate
  );

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      // dispatch({ type: userActionsTypes.USER_DETAILS_RESET });
      // dispatch({ type: orderActionsTypes.ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <Grid style={{ marginTop: 2 }} centered>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 690 }}>
            <CheckoutSteps step1 step2 step3 step4 />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          {/* Details */}
          <Grid.Column computer={10}>
            <Item.Group divided>
              {/* Shipping Info */}
              <Item>
                <Item.Content>
                  <Item.Header as="h2">Shipping</Item.Header>
                  <Item.Description>
                    <strong>Address: </strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                    {cart.shippingAddress.postalCode},{" "}
                    {cart.shippingAddress.country}
                  </Item.Description>
                </Item.Content>
              </Item>

              {/* Payment Method */}
              <Item>
                <Item.Content>
                  <Item.Header as="h2">Payment Method</Item.Header>
                  <Item.Description>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                  </Item.Description>
                </Item.Content>
              </Item>

              {/* Order Items */}
              <Item>
                <Item.Content>
                  <Item.Header as="h2">Order Items</Item.Header>
                  {cart.cartItems.length === 0 ? (
                    <Message info>Your cart is empty</Message>
                  ) : (
                    <Item.Group divided>
                      {cart.cartItems.map((item) => (
                        <Item
                          key={item.product}
                          as={Link}
                          to={`/product/${item.product}`}
                        >
                          <Item.Image size="tiny" src={item.image} rounded />

                          <Item.Content>
                            {/* Name Product */}
                            <Item.Header>{item.name}</Item.Header>

                            {/* Price Product */}
                            <Item.Meta>
                              <span className="price">
                                {item.qty} x ${item.price} = $
                                {item.qty * item.price}
                              </span>
                            </Item.Meta>
                          </Item.Content>
                        </Item>
                      ))}
                    </Item.Group>
                  )}
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Column>

          {/* Order Summary */}
          <Grid.Column computer={6}>
            <Segment>
              <Item.Group divided>
                {/* Order Summary */}
                <Item header="Order Summary" as="h2" />

                {/* Items */}
                <Item
                  header="Items:"
                  content={<span> ${cart.itemsPrice}</span>}
                />

                {/* Shipping */}
                <Item
                  header="Shipping:"
                  content={<span> ${cart.shippingPrice}</span>}
                />

                {/* Tax */}
                <Item header="Tax:" content={<span> ${cart.taxPrice}</span>} />

                {/* Total */}
                <Item
                  header="Total:"
                  content={<span> ${cart.totalPrice}</span>}
                />

                {error && (
                  <Item content={<Message negative content={error} />} />
                )}

                <Item
                  extra={
                    <Button
                      disabled={cart.cartItems === 0}
                      onClick={placeOrderHandler}
                      loading={loading}
                      secondary
                    >
                      Place Order
                    </Button>
                  }
                />
              </Item.Group>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default PlaceOrderScreen;
