import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CircularIndeterminate from "../../components/circular loading/circularLoading.jsx";

import "./Login.css";
import progressaLogo from "../../imgs/logo.png";
import { validateLogin } from "../../api/login&signin.js";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    setShowLoading(true);

    const result = await validateLogin(username, password);

    setShowLoading(false);

    if (result.error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      console.log("react: " + result.message);
      return;
    }

    navigate(`/${username}/dashboard`);
  }

  return (
    <>
      <form className="login-div" onSubmit={handleLogin}>
        <img src={progressaLogo} alt="Progressa Logo" />
        <h1>Progressa</h1>
        <h2>
          Track Your Journey <br /> Build a Healthier You
        </h2>
        <div className="input-group">
          <input
            type="text"
            id="username-input"
            placeholder=" "
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username-input">Username</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            id="password-input"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password-input">Password</label>
        </div>
        {showError && (
          <p style={{ color: "red" }}>Username or password is wrong</p>
        )}
        <button type="submit">
          {showLoading ? <CircularIndeterminate /> : "Login"}
        </button>
        <p>
          Don't have an account? <Link to={"/Signup"}>Create Account</Link>
        </p>
      </form>
    </>
  );
}
