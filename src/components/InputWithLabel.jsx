import React from "react";

const InputWithLabel = (props) => {
  return (
    <div className="input-container">
        <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        onChange={(e) => props.handleChange(e)}
        value={props.value}
        id={props.id}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputWithLabel;
