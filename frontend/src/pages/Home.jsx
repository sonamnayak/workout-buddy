import { useEffect, useState } from "react";
import Workout from "../components/Workout";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const [allWorkouts, setAllWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:3001/api/workouts");
      const data = await response.json();

      if (response.ok) {
        setAllWorkouts(data);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {allWorkouts &&
          allWorkouts.map((workout) => (
            <Workout key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
