import React, { useEffect, useState } from "react";
import { Grid, Item, Message, Segment, Loader } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";

import { getClientIdPayPal } from "../api/paypalApi";
import { getOrderDetails, payOrder } from "../redux/actions/orderActions";
import { orderActionsTypes } from "../redux/actions/actionsTypes";

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );
  const {
    userInfo: { token },
  } = useSelector((state) => state.userLogin);

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    const addPayPalScript = async (tk) => {
      const { data } = await getClientIdPayPal(tk);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}&buyer-country=US`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: orderActionsTypes.ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript(token);
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, token, order, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  // load Content
  if (loading) {
    return <Loader>Loading...</Loader>;
  }

  // If exist Error
  if (error) {
    return (
      <Message negative>
        <Message.Header>Error</Message.Header>
        <p>{error}</p>
      </Message>
    );
  }

  return (
    <>
      <h1>Order {order._id}</h1>
      <Grid style={{ marginTop: 2 }} centered>
        <Grid.Row>
          {/* Details */}
          <Grid.Column computer={10}>
            <Item.Group divided>
              {/* Shipping Info */}
              <Item>
                <Item.Content>
                  <Item.Header as="h2">Shipping</Item.Header>
                  <Item.Description>
                    <p>
                      <strong>Name: </strong>
                      {order.user.name}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city}{" "}
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <Message
                        positive
                        content={`Delivered on ${order.deliveredAt}`}
                      />
                    ) : (
                      <Message negative content="Not Delivered" />
                    )}
                  </Item.Description>
                </Item.Content>
              </Item>

              {/* Payment Method */}
              <Item>
                <Item.Content>
                  <Item.Header as="h2">Payment Method</Item.Header>
                  <Item.Description>
                    <p>
                      <strong>Method: </strong>
                      {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <Message positive content={`Paid on ${order.paidAt}`} />
                    ) : (
                      <Message negative content="Not Paid" />
                    )}
                  </Item.Description>
                </Item.Content>
              </Item>

              {/* Order Items */}
              <Item>
                <Item.Content>
                  <Item.Header as="h2">Order Items</Item.Header>
                  {order.orderItems.length === 0 ? (
                    <Message info>Your cart is empty</Message>
                  ) : (
                    <Item.Group divided>
                      {order.orderItems.map((item) => (
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
                  content={<span> ${order.itemsPrice}</span>}
                />

                {/* Shipping */}
                <Item
                  header="Shipping:"
                  content={<span> ${order.shippingPrice}</span>}
                />

                {/* Tax */}
                <Item header="Tax:" content={<span> ${order.taxPrice}</span>} />

                {/* Total */}
                <Item
                  header="Total:"
                  content={<span> ${order.totalPrice}</span>}
                />

                {/* PayPal */}
                {!order.isPaid && (
                  <Item>
                    <Item.Content>
                      {!sdkReady ? (
                        <Loader size="small" content="Loading..." />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </Item.Content>
                  </Item>
                )}
              </Item.Group>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default OrderScreen;
