import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorkout } from "../store/slices/workoutsSlice";
import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
// import useAuthContext from "../hooks/useAuthContext";
// import useWorkoutsContext from "../hooks/useWorkoutsContext";

const Workout = ({ workout }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.workouts);
  // const { dispatch } = useWorkoutsContext();
  // const { user } = useAuthContext();

  const handleDelete = async () => {
    dispatch(deleteWorkout(workout._id));
    // try {
    //   const response = await fetch(
    //     "http://localhost:3001/api/workouts/" + workout._id,
    //     {
    //       method: "DELETE",
    //       headers: {
    //         Authorization: `Bearer ${user.token}`,
    //       },
    //     }
    //   );
    //   const data = await response.json();
    //   if (response.ok) {
    //     dispatch({ type: "DELETE_WORKOUT", payload: workout._id });
    //   } else {
    //     console.error("Error deleting workout:", data.message);
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };

  useEffect(() => {
    if (status === "error") console.log("Error deleting workout: ", error);
  }, [status, error]);

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

Workout.propTypes = {
  workout: PropTypes.object.isRequired,
};
