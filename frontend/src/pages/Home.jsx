import { useEffect } from "react";
import Workout from "../components/Workout";
import WorkoutForm from "../components/WorkoutForm";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import useAuthContext from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:3001/api/workouts", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <Workout key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
