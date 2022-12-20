import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Wrapper = (props) => {
  return <div className="wrapper">
    <div className="wrapper-container">{props.children}
    <ToastContainer  autoClose={3000} />
    </div>
    </div>;
};

export default Wrapper;
