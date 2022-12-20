import React, { useState } from "react";
import Button from "../../components/Button";
import "../../assets/css/Login.css";
import InputWithLabel from "../../components/InputWithLabel";
import BackButton from "../../components/BackButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StartGame = () => {
  const [email, setEmail] = useState("");
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
        <p>Start a new game</p>
        <p>Whom do you want to play with?</p>
        <div>
          <InputWithLabel
            type="text"
            value={email}
            id="email"
            label="Email"
            placeholder="Type their email here"
            handleChange={(e) => setEmail(e.target.value)}
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
          Start a Game
        </Button>
      </div>
    </div>
  );
};

export default StartGame;
