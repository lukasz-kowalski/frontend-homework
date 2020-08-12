import React from "react";

const Button = ({ type = "button", handleClick, children, name }) => {
  return (
    <button type={type} name={name} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
