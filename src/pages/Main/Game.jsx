import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import "../../assets/css/Game.css";
import BackButton from "../../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import Cross from "../../components/Cross";
import Circle from "../../components/Circle";
import { MainContext } from "../Context/MainContextComponent";
import useAuth from "../../hooks/useAuth";
import Box from "../../components/Box";

const Game = () => {
  const navigate = useNavigate();
  const [crossedIndex, setCrossedIndex] = useState(-1);
  const { id } = useParams();
  const {
    handleGetGame,
    selectedGame,
    handleUpdateGame,
    setSelectedGame,
    handleCreateGame,
    opponent,
    isMyMove,
    isMeWinner,
    isDraw,
    isFinished,
  } = useContext(MainContext);
  const { auth } = useAuth();

  const handleSubmit = async () => {
    if (isFinished) {
      await handleCreateGame({ email: opponent.email });
      return;
    }
    await handleUpdateGame(id, { currentGame: [...selectedGame.currentGame] });
  };

  const handleChange = (index) => {
    if (!isMyMove) {
      return;
    }
    const copyOfCurrentGame = [...selectedGame.currentGame];
    if (crossedIndex === -1 && copyOfCurrentGame[index] === auth.id) return;
    else if (crossedIndex === -1) {
      setCrossedIndex(index);
      copyOfCurrentGame[index] = auth.id;
      setSelectedGame((prev) => {
        return { ...prev, currentGame: copyOfCurrentGame };
      });
    } else if (crossedIndex === index) {
      setCrossedIndex(-1);
      copyOfCurrentGame[index] = "";
      setSelectedGame((prev) => {
        return { ...prev, currentGame: copyOfCurrentGame };
      });
    }
  };

  useEffect(() => {
    handleGetGame(id);
  }, []);

  return (
    <div className="game-container">
      <div className="game-container_back">
        <BackButton
          handleClick={() => {
            navigate("/home");
          }}
        />
      </div>
      <div className="game-container_inner">
        <p>Game with {opponent?.name}</p>
        <p>Your Piece</p>
        <Cross
          style={{ textAlign: "left", marginBottom: "30px", fontSize: "2.5em" }}
          className="simple-cross"
        />
        <div className="game-status flex-center-center">
          <span>
            {isFinished
              ? isDraw
                ? "It’s a Draw!"
                : isMeWinner
                ? "You win"
                : "You loss"
              : isMyMove
              ? "Your move"
              : "Their move"}
          </span>
        </div>
        <div className="board">
          {selectedGame?.currentGame?.map((item, index) => {
            if (item === "") {
              return <Box handleClick={handleChange} index={index} />;
            } else if (item === auth.id) {
              return <Cross handleClick={handleChange} index={index} />;
            } else {
              return <Circle />;
            }
          })}
        </div>
      </div>
      <div className="flex-center-center">
        <Button
          color={isFinished ? "#F2C94C" : isMyMove ? "#F2C94C" : "#999999"}
          handleClick={handleSubmit}
          cursor={isFinished ? "pointer" : isMyMove ? "pointer" : "no-drop"}
        >
          {isFinished
            ? "Start another game"
            : isMyMove
            ? "Submit"
            : `Wait for ${opponent.name}`}
        </Button>
      </div>
    </div>
  );
};

export default Game;
