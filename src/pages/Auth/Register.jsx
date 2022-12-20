import React, { useContext, useState } from "react";
import Button from "../../components/Button";
import "../../assets/css/Register.css";
import InputWithLabel from "../../components/InputWithLabel";
import BackButton from "../../components/BackButton";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../Context/MainContextComponent";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister } = useContext(MainContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await handleRegister({
      name,
      email,
      username,
      password,
    });
  };
  return (
    <div className="login-container">
      <div className="register-container_back">
        <BackButton
          handleClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="register-container_inner">
        <p>Create account</p>
        <p>Let's get to know you better!</p>
        <div>
          <InputWithLabel
            type="text"
            value={name}
            id="name"
            label="Your name"
            placeholder="Type your name here"
            handleChange={(e) => setName(e.target.value)}
          />
          <InputWithLabel
            type="text"
            value={username}
            id="username"
            label="Username"
            placeholder="Type your username here"
            handleChange={(e) => setUsername(e.target.value)}
          />
          <InputWithLabel
            type="email"
            id="email"
            label="Email"
            placeholder="Type your email here"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
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
        <Button color={"#F2C94C"} handleClick={handleSubmit}>
          Register
        </Button>
      </div>
    </div>
  );
};

export default Register;
