import React from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import useAuthContext from "../hooks/useAuthContext";

const Workout = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/workouts/" + workout._id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "DELETE_WORKOUT", payload: workout._id });
      } else {
        console.error("Error deleting workout:", data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        Delete
      </span>
    </div>
  );
};

export default Workout;
