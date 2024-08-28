import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
// import useAuthContext from "./hooks/useAuthContext";
import { useSelector } from "react-redux";

function App() {
  // const { user } = useAuthContext();
  const user = useSelector(state => state.user)
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user?.userId ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/register"
              element={!user?.userId ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user?.userId ? <Login /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
