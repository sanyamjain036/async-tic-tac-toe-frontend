import React, { useContext, useState } from "react";
import Button from "../../components/Button";
import "../../assets/css/Login.css";
import InputWithLabel from "../../components/InputWithLabel";
import BackButton from "../../components/BackButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MainContext } from "../Context/MainContextComponent";

const StartGame = () => {
  const [email, setEmail] = useState("");
  const { handleCreateGame } = useContext(MainContext);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    await handleCreateGame({ email });
  };
  return (
    <div className="login-container">
      <div className="login-container_back">
        <BackButton
          handleClick={() => {
            navigate("/home");
          }}
        />
      </div>
      <div className="login-container_inner">
        <p>Start a new game</p>
        <p>Whom do you want to play with?</p>
        <div>
          <InputWithLabel
            type="email"
            value={email}
            id="email"
            label="Email"
            placeholder="Type their email here"
            handleChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-center-center">
        <Button color={"#F2C94C"} handleClick={handleSubmit}>
          Start a Game
        </Button>
      </div>
    </div>
  );
};

export default StartGame;
