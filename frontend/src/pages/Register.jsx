import { useState, useEffect } from "react";
import { register } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
// import useRegister from "../hooks/useRegister";

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);
  const { status, error: errorMsg } = useSelector((state) => state.user);
  // const { register, isLoading, error } = useRegister();

  const handleSubmit = async (e) => {
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
    dispatch(register({ email, password }));
    // try {
    //   await register(email, password);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  useEffect(() => {
    if (status === "error") setError(errorMsg);
  }, [status, errorMsg]);

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
      <button disabled={status === "loading"}>
        {status === "loading" ? "Please wait..." : "Register"}
      </button>
      {/* <button disabled={isLoading}>Register</button> */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Register;
