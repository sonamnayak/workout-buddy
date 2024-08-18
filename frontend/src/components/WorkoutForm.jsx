import { useState } from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import useAuthContext from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmptyFields([]);
    if (!title || !load || !reps) {
      setEmptyFields(
        [!title && "title", !load && "load", !reps && "reps"].filter(Boolean)
      );
      setError("Please fill in all the fields.");
      return;
    }
    const workout = { title, load, reps, userId: user.userId };
    try {
      const response = await fetch("http://localhost:3001/api/workouts", {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "CREATE_WORKOUT", payload: data });
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a Workout</h3>
      <label>Exercise Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") && !title ? "error" : ""}
      />
      <label>Load (kg):</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes("load") && !load ? "error" : ""}
      />
      <label>Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes("reps") && !reps ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
