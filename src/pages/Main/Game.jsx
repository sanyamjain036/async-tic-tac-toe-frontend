import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import "../../assets/css/Game.css";
import InputWithLabel from "../../components/InputWithLabel";
import BackButton from "../../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Cross from "../../components/Cross";
import Circle from "../../components/Circle";
import { MainContext } from "../Context/MainContextComponent";

const Game = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { handleGetGame, selectedGame, setSelectedGame } =
    useContext(MainContext);

  useEffect(() => {
    handleGetGame(id);
  }, []);
  
  return (
    <div className="game-container">
      <div className="game-container_back">
        <BackButton
          handleClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="game-container_inner">
        <p>Game with Tanmay</p>
        <p>Your Piece</p>
        <Cross
          style={{ textAlign: "left", marginBottom: "30px", fontSize: "2.5em" }}
        />
        <div className="game-status flex-center-center">
          <span>Your move</span>
        </div>
        <div className="board">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
            return <Cross />;
          })}
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

export default Game;
