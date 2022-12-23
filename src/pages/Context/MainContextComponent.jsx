import React, { createContext, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import {
  createGame,
  getAllGames,
  getGame,
  login,
  register,
  updateGame,
} from "./API";
import useAuth from "../../hooks/useAuth";
import io from "socket.io-client";

// const baseURL = "http://127.0.0.1:5000";
const baseURL = "https://async-tic-tac-toe-backend.onrender.com/";
const socket = io(baseURL);

export const MainContext = createContext();

const MainContextComponent = ({ children }) => {
  const navigate = useNavigate();
  const [allGames, setAllGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [crossedIndex, setCrossedIndex] = useState(-1);
  const { auth } = useAuth();

  const handleRegister = async (values) => {
    try {
      const res = await register(values);
      toast.success("Congratulations!!! Account created.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (e) {
      console.log(e.response);
      toast.error(e.response.data.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
  const handleLogin = async (values) => {
    try {
      const res = await login(values);
      const token = res.data.token;
      const days = 30;
      Cookies.set("token", token, {
        expires: days,
      });
      navigate("/home", { replace: true });
      toast.success("Login Successfully!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (e) {
      console.log(e.response);
      toast.error(e.response.data.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
  const handleCreateGame = async (values) => {
    try {
      const res = await createGame(values);
      const game = res.data;
      navigate(`/game/${game._id}`, { replace: true });
      // toast.success("Login Successfully!", {
      //   position: toast.POSITION.BOTTOM_CENTER,
      // });
    } catch (e) {
      console.log(e.response);
      toast.error(e.response.data.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
  const handleGetAllGames = async () => {
    try {
      const res = await getAllGames();
      setAllGames(res.data);
    } catch (e) {
      console.log(e.response);
      toast.error(e.response.data.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
  const handleGetGame = async (id) => {
    try {
      const res = await getGame(id);
      setSelectedGame(res.data);
    } catch (e) {
      console.log(e.response);
      toast.error(e.response.data.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
  const handleUpdateGame = async (id, values) => {
    try {
      const res = await updateGame(id, values);
      // setSelectedGame(res.data);
    } catch (e) {
      console.log(e.response);
      toast.error(e.response.data.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const opponent = useMemo(() => {
    if (!selectedGame) return "";
    return selectedGame.player1._id === auth.id
      ? selectedGame.player2
      : selectedGame.player1;
  }, [selectedGame]);

  // const isMe = (id) => id === auth.id;

  const isMyMove = useMemo(() => {
    if (!selectedGame) return "";
    return selectedGame.status === 0 && selectedGame.currentChance === auth.id;
  }, [selectedGame]);

  const isMeWinner = useMemo(() => {
    if (!selectedGame) return "";
    return selectedGame.status === 1 && selectedGame.winner._id === auth.id;
  }, [selectedGame]);

  const isDraw = useMemo(() => {
    if (!selectedGame) return "";
    return selectedGame.status === -1;
  }, [selectedGame]);

  const isFinished = useMemo(() => {
    if (!selectedGame) return "";
    return selectedGame.status !== 0;
  }, [selectedGame]);

  useEffect(() => {
    socket.on("connnection", () => {
      console.log("connected to server");
    });

    socket.on("update-game", (updatedGame) => {
      setSelectedGame(updatedGame);
      setCrossedIndex(-1);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnecting");
    });

    return () => {
      socket.off("connnection");
      socket.off("disconnect");
      socket.off("update-game");
    };
  }, []);

  return (
    <MainContext.Provider
      value={{
        handleRegister,
        handleLogin,
        handleCreateGame,
        handleGetAllGames,
        handleGetGame,
        handleUpdateGame,
        setSelectedGame,
        crossedIndex,
        setCrossedIndex,
        opponent,
        // isMe,
        isMyMove,
        isMeWinner,
        isDraw,
        isFinished,
        allGames,
        selectedGame,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextComponent;
