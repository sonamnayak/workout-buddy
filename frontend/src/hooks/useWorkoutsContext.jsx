import { WorkoutsContext } from "../context/workoutsContext";
import { useContext } from "react";

const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);
  if (!context) {
    throw new Error(
      "useWorkoutsContext must be used inside the WorkoutsContextProvider"
    );
  }
  return context;
};

export default useWorkoutsContext;
