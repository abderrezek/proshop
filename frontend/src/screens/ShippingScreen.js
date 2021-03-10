import React, { useState } from "react";
import { Grid, Header, Form, Message, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import { saveShippingAddress } from "../redux/actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = ({ history }) => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [data, setData] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(data));
    history.push("/payment");
  };

  const onChange = (e, { value }) =>
    setData((state) => ({ ...state, [e.target.name]: value }));

  return (
    <>
      <Grid style={{ marginTop: 2 }} centered>
        <Grid.Column style={{ maxWidth: 690 }}>
          <CheckoutSteps step1 step2 />
        </Grid.Column>
      </Grid>

      <Grid style={{ height: "80vh" }} verticalAlign="middle" centered>
        <Grid.Column style={{ maxWidth: 450 }}>
          {/* Header */}
          <Header as="h1" color="black" textAlign="center">
            Shipping
          </Header>

          <Form
            onSubmit={submitHandler}
            loading={loading}
            // success={error && error.length === 0}
            // error={error && error.length !== 0}
          >
            {/* {error && <Message error header="Connexion" content={error} />} */}

            {/* Address */}
            <Form.Input
              value={data.address}
              label="address"
              name="address"
              onChange={onChange}
              required
            />

            {/* City */}
            <Form.Input
              value={data.city}
              label="city"
              name="city"
              onChange={onChange}
              required
            />

            {/* Postal Code */}
            <Form.Input
              value={data.postalCode}
              label="Postal Code"
              name="postalCode"
              onChange={onChange}
              required
            />

            {/* Country */}
            <Form.Input
              value={data.country}
              label="Country"
              name="country"
              onChange={onChange}
              required
            />

            <Button type="submit" color="black">
              Continue
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default ShippingScreen;
