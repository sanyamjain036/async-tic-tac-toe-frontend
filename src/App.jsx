import "./App.css";
import Wrapper from "./components/Wrapper";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Layout from "./components/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LandingPage from "./pages/Main/LandingPage";
import Home from "./pages/Main/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import MainContextComponent from "./pages/Context/MainContextComponent";
import StartGame from "./pages/Main/StartGame";
import Game from "./pages/Main/Game";

function App() {
  const { auth } = useAuth();
  return (
    <div className="App">
      <Wrapper>
        <MainContextComponent>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Public Routes */}
                <Route path="/" element={auth ? <Home /> : <LandingPage />} />
                <Route
                  path="/login"
                  element={auth ? <Navigate to="/" /> : <Login />}
                />
                <Route
                  path="/register"
                  element={auth ? <Navigate to="/" /> : <Register />}
                />
                {/* Private Routes */}
                <Route element={<ProtectedRoutes />}>
                  <Route path="/start" element={<StartGame />} />
                  <Route path="/game/:id" element={<Game />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </MainContextComponent>
      </Wrapper>
    </div>
  );
}

export default App;
