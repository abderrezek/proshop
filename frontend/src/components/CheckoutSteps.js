import React from "react";
import { Step } from "semantic-ui-react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Step.Group ordered>
      <Step
        as={Link}
        to="/login"
        completed={step1}
        link={step1}
        disabled={!step1}
      >
        <Step.Content>
          <Step.Title>Sign In</Step.Title>
        </Step.Content>
      </Step>

      <Step
        as={Link}
        to="/shipping"
        completed={step2}
        link={step2}
        disabled={!step2}
      >
        <Step.Content>
          <Step.Title>Shipping</Step.Title>
        </Step.Content>
      </Step>

      <Step
        as={Link}
        to="/payment"
        completed={step3}
        link={step3}
        disabled={!step3}
      >
        <Step.Content>
          <Step.Title>Payment</Step.Title>
        </Step.Content>
      </Step>

      <Step
        as={Link}
        to="/placeorder"
        completed={step4}
        link={step4}
        disabled={!step4}
      >
        <Step.Content>
          <Step.Title>Place Order</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  );
};

export default CheckoutSteps;
