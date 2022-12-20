import React, { useState } from "react";
import Button from "../../components/Button";
import "../../assets/css/Home.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router";

const GameCard = () => {
  const navigate = useNavigate();
  return (
    <div className="gameCard">
      <div className="gameCard-inner">
        <h3>Game with Harsh</h3>
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
  const [state, setState] = useState(true);
  const navigate = useNavigate();
  if (state) {
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
        {[1, 2, 3, 4, 5, 6].map((item) => {
          return <GameCard />;
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
