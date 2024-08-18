import { useState } from "react";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const { login, isLoading, error } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmptyFields([]);
    if (!email || !password) {
      setEmptyFields(
        [!email && "email", !password && "password"].filter(Boolean)
      );
      return;
    }
    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="login" onSubmit={handleLogin}>
      <h3>Login!</h3>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
