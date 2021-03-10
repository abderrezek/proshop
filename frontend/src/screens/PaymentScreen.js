import React, { useState } from "react";
import { Grid, Header, Form, Button, Checkbox } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import { savePaymentMethod } from "../redux/actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <>
      <Grid style={{ marginTop: 2 }} centered>
        <Grid.Column style={{ maxWidth: 690 }}>
          <CheckoutSteps step1 step2 step3 />
        </Grid.Column>
      </Grid>

      <Grid style={{ height: "80vh" }} verticalAlign="middle" centered>
        <Grid.Column style={{ maxWidth: 450 }}>
          {/* Header */}
          <Header as="h1" color="black" textAlign="center">
            Payment Method
          </Header>

          <Form onSubmit={submitHandler} loading={loading}>
            {/* PayPal */}
            <Form.Field>
              <Checkbox
                radio
                label="PayPal or Credit Card"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e, { value }) => setPaymentMethod(value)}
              />
            </Form.Field>

            {/* Stripe */}
            {/* <Form.Field>
              <Checkbox
                radio
                label="Stripe"
                name="paymentMethod"
                value="Stripe"
                checked={paymentMethod === "Stripe"}
                onChange={(e, { value }) => setPaymentMethod(value)}
              />
            </Form.Field> */}

            <Button type="submit" color="black">
              Continue
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default PaymentScreen;
