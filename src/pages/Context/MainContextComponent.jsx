import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { createGame, getAllGames, getGame, login, register } from "./API";

export const MainContext = createContext();

const MainContextComponent = ({ children }) => {
  const navigate = useNavigate();
  const [allGames, setAllGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

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

  return (
    <MainContext.Provider
      value={{
        handleRegister,
        handleLogin,
        handleCreateGame,
        handleGetAllGames,
        handleGetGame,
        allGames,
        selectedGame,
        setSelectedGame,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextComponent;
