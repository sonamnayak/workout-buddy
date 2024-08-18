import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useRegister = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const register = async (email, password) => {
    setIsLoading(true);
    const user = { email, password };
    const response = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      setError("");
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({type: "LOGIN", payload: data});
    } else {
      setError(data.message);
    }
    setIsLoading(false);
  };
  return { register, isLoading, error };
};

export default useRegister;
