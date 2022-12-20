import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import "../../assets/css/Home.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";
import { MainContext } from "../Context/MainContextComponent";
import useAuth from "../../hooks/useAuth";

const GameCard = (props) => {
  const navigate = useNavigate();
  const {auth}=useAuth();
  const opponent=props.item.player1._id===auth.id?props.item.player2:props.item.player1;
  
  return (
    <div className="gameCard">
      <div className="gameCard-inner">
        <h3>{`Game with ${opponent.name}`}</h3>
        <p>Tanmay just made their move! It’s your turn to play now.</p>
        <small>9th June 2022, 3:15pm</small>
      </div>
      <Button
        color="#F2C94C"
        width="21vw"
        height="40px"
        handleClick={() => navigate("/start")}
      >
        Let's Play
      </Button>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { handleGetAllGames, allGames } = useContext(MainContext);

  useEffect(() => {
    handleGetAllGames();
  }, []);

  if (allGames.length === 0) {
    return (
      <div className="home-container">
        <p className="home-container_head">Your Games</p>
        <div className="home-container_no_item">
          <p>No Games</p>
          <p>Found</p>
          <Button
            color="#F2C94C"
            width="23vw"
            height="40px"
            handleClick={() => navigate("/start")}
          >
            Start a new game
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="home-container">
      <p className="home-container_head">Your Games</p>
      <div className="home-container_items">
        {allGames.map((item) => {
          return <GameCard key={item._id} item={item} />;
        })}
      </div>
      <div className="floating-btn-container">
        <Button
          color="#270F36"
          width="10vw"
          height="40px"
          className="flex-center-center"
        >
          <AiOutlinePlus style={{ fontSize: "20px" }} />
          &nbsp; New Game
        </Button>
      </div>
    </div>
  );
};

export default Home;
