import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import useAuthContext from "../hooks/useAuthContext";
// import useWorkoutsContext from "../hooks/useWorkoutsContext";
import { logout } from "../store/slices/userSlice";

const Navbar = () => {
  // const { user, dispatch } = useAuthContext();
  // const { dispatch: workoutsDispatch } = useWorkoutsContext();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    // localStorage.removeItem("user");
    // dispatch({ type: "LOGOUT" });
    // workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
    dispatch(logout());
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user?.email ? (
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
