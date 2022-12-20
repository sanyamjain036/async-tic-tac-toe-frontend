import React, { useState } from "react";
import Button from "../../components/Button";
import "../../assets/css/Login.css";
import InputWithLabel from "../../components/InputWithLabel";
import BackButton from "../../components/BackButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <div className="login-container_back">
        <BackButton
          handleClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="login-container_inner">
        <p>Login</p>
        <p>Please enter your details</p>
        <div>
          <InputWithLabel
            type="text"
            value={username}
            id="username"
            label="Username"
            placeholder="Type your username here"
            handleChange={(e) => setUsername(e.target.value)}
          />
          <InputWithLabel
            type="password"
            id="password"
            label="Password"
            placeholder="Type your password here"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-center-center">
        <Button
          color={"#F2C94C"}
          handleClick={() => {
            toast.success("Success Notification !", {
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
