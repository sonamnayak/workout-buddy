import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useWorkoutsContext from "../hooks/useWorkoutsContext";

const Navbar = () => {
  const { user, dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user ? (
            <div>
              <span>{user.email}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
