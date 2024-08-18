import { useState } from "react";
import useRegister from "../hooks/useRegister";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const { register, isLoading, error } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmptyFields([]);
    if (!email || !password) {
      setError("Please fill in all fields");
      setEmptyFields(
        [!email && "email", !password && "password"].filter(Boolean)
      );
      return;
    }
    try {
      await register(email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h3>Register!</h3>
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
      <button disabled={isLoading}>Register</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Register;
