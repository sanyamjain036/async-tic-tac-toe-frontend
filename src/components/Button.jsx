import React from "react";

const Button = (props) => {
  return (
    <button
      className={`btn ${props?.className}`}
      style={{
        backgroundColor: props.color,
        width: props?.width,
        height: props?.height,
        cursor: props?.cursor,
      }}
      onClick={props.handleClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
