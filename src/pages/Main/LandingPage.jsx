import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/LandingPage.css";
import Button from "../../components/Button";
import { MainContext } from "../Context/MainContextComponent";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-container">
      <div className="landing-container_inner">
        <span>async</span>
        <p>tic tac</p>
        <p>toe</p>
      </div>
      <div className="landing-container_inner-2">
        <Button color={"#F2C94C"} handleClick={() => navigate("/login")}>
          Login
        </Button>
        <br />
        <Button color={"#2F80ED"} handleClick={() => navigate("/register")}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
