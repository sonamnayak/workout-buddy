import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const initialState = {
    user: JSON.parse(localStorage.getItem("user")),
  };

  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, user: action.payload };
      case "LOGOUT":
        return { ...state, user: null };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
