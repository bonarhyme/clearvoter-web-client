import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({
  animation = "border",
  color = "#272727",
  size = "50",
  display = "block",
}) => {
  return (
    <Spinner
      animation={animation}
      role="status"
      style={{
        width: size + "px",
        height: size + "px",
        margin: "auto",
        display,
        color,
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
