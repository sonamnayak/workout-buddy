import { useEffect } from "react";
import Workout from "../components/Workout";
import WorkoutForm from "../components/WorkoutForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllWorkouts } from "../store/slices/workoutsSlice";
// import useWorkoutsContext from "../hooks/useWorkoutsContext";
// import useAuthContext from "../hooks/useAuthContext";

const Home = () => {
  const dispatch = useDispatch();
  const workouts = useSelector((state) => state.workouts.workouts);
  // const { workouts, dispatch } = useWorkoutsContext();
  // const { user } = useAuthContext();

  useEffect(() => {
    dispatch(getAllWorkouts());
    // const fetchWorkouts = async () => {
    //   const response = await fetch("http://localhost:3001/api/workouts", {
    //     headers: { Authorization: `Bearer ${user.token}` },
    //   });
    //   const data = await response.json();

    //   if (response.ok) {
    //     dispatch({ type: "SET_WORKOUTS", payload: data });
    //   }
    // };

    // fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts.length ? (
          workouts.map((workout) => (
            <Workout key={workout._id} workout={workout} />
          ))
        ) : (
          <span>No workouts added!</span>
        )}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
