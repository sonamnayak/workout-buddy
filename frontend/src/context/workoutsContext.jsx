import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const WorkoutsContextProvider = ({ children }) => {
  const workoutsReducer = (state, action) => {
    switch (action.type) {
      case "SET_WORKOUTS":
        return { ...state, workouts: action.payload };
      case "CREATE_WORKOUT":
        return { ...state, workouts: [action.payload, ...state.workouts] };
      case "DELETE_WORKOUT":
        return {
          ...state,
          workouts: state.workouts.filter(
            (workout) => workout._id !== action.payload
          ),
        };
      default:
        return state;
    }
  };
  const initialState = {
    workouts: null,
  };
  const [state, dispatch] = useReducer(workoutsReducer, initialState);
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
