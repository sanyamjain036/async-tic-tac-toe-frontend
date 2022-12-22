import React from "react";

const Box = (props) => {
  return (
    <div className="box" onClick={() => props.handleClick(props.index)}>
      &nbsp;
    </div>
  );
};

export default Box;
