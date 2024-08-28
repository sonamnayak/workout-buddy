import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/userSlice";
// import useLogin from "../hooks/useLogin";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);
  const { status, error: errorMsg } = useSelector(state => state.user);
  // const { login, isLoading, error } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    setEmptyFields([]);
    setError(null);
    if (!email || !password) {
      setEmptyFields(
        [!email && "email", !password && "password"].filter(Boolean)
      );
      setError("Please fill all the fields");
      return;
    }
    dispatch(login({ email, password }));
    // try {
    //   await login(email, password);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  useEffect(() => {
    if (status === "error") setError(errorMsg);
  }, [status, errorMsg])

  return (
    <form className="login" onSubmit={handleLogin}>
      <h3>Log in!</h3>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={emptyFields.includes("email") && !email ? "error" : ""}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={emptyFields.includes("password") && !password ? "error" : ""}
      />
      <button disabled={status === "loading"}>
        {status === "loading" ? "Please wait..." : "Log in"}
      </button>
      {/* <button disabled={isLoading}>Login</button> */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
