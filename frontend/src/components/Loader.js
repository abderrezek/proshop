import React from "react";
import { Loader as Spinner, Dimmer } from "semantic-ui-react";

const Loader = ({ text = "" }) => {
  return (
    <Dimmer active>
      <Spinner>{text}</Spinner>
    </Dimmer>
  );
};

export default Loader;
