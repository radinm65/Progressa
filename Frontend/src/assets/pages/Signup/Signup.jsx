import "./Signup.css";
import progressaLogo from "../../imgs/logo.png";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'

import { useState } from "react";
import { signup } from "../../api/login&signin";
import CircularIndeterminate from "../../components/circular loading/circularLoading.jsx";

export function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("");
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setShowLoading(true);

    let result;
    try {
      result = await signup(
        name,
        username,
        email,
        password,
        Number(height),
        Number(weight),
        Number(age),
        goal,
      );
    } catch (e) {
      console.log(e);
    }

    setShowLoading(false);

    if (result.error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
      console.log("react: " + result.message);
      return;
    }

    navigate("/Dashboard");
  }

  return (
    <>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="head">
          <img src={progressaLogo} alt="progressa-logo" />
          <div>
            <h1>Signup</h1>
            <h4>Start Your Journey</h4>
          </div>
        </div>
        {/* first row inputs */}
        <div className="first-row">
          <div className="group-info">
            <input
              type="text"
              id="name-input"
              placeholder=" "
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name-input">Name</label>
            <small>e.g. John Doe</small>
          </div>

          <div className="group-info">
            <input
              type="text"
              id="username-input"
              placeholder=" "
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username-input">Username</label>
            <small>e.g. john_fit</small>
          </div>
        </div>
        {/* second row inputs */}
        <div className="second-row">
          <div className="group-info">
            <input
              type="email"
              id="email-input"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email-input">Email</label>
            <small>e.g. john@example.com</small>
          </div>

          <div className="group-info">
            <input
              type="password"
              id="password-input"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password-input">Password</label>
            <small>e.g. 8+ characters</small>
          </div>
        </div>
        {/* third row inputs */}
        <div className="third-row">
          <div className="group-info">
            <input
              type="text"
              id="age-input"
              placeholder=" "
              onChange={(e) => setAge(e.target.value)}
            />
            <label htmlFor="age-input">Age</label>
            <small>e.g. 25</small>
          </div>

          <div className="group-info">
            <input
              type="text"
              list="goals"
              id="goal-input"
              placeholder=" "
              onChange={(e) => setGoal(e.target.value)}
            />
            <label htmlFor="goal-input">Goal</label>
            <small>e.g. Build Muscle</small>
            <datalist id="goals">
              <option value="Build Muscle"></option>
              <option value="Lose Fat"></option>
              <option value="Maintain Fitness"></option>
              <option value="Improve Endurance"></option>
              <option value="Get Stronger"></option>
            </datalist>
          </div>
        </div>
        {/* fourth row inputs */}
        <div className="fourth-row">
          <div className="group-info">
            <input
              type="text"
              id="height-input"
              placeholder=" "
              onChange={(e) => setHeight(e.target.value)}
            />
            <label htmlFor="height-input">Height</label>
            <small>e.g. 180 cm</small>
          </div>

          <div className="group-info">
            <input
              type="text"
              id="weight-input"
              placeholder=" "
              onChange={(e) => setWeight(e.target.value)}
            />
            <label htmlFor="weight-input">weight</label>
            <small>e.g. 75 kg</small>
          </div>
        </div>
        {showError && <p style={{ color: "red" }}>Inputs are wrong</p>}
        <div className="buttom">
          <div>
            <p>
              Do You Have an account? <Link to={"/"}>Login</Link>
            </p>
          </div>
          <div className="buttons-div">
            <button type="submit">
              {showLoading ? <CircularIndeterminate /> : "Create Account"}
            </button>
            <button type="reset">Reset</button>
          </div>
        </div>
      </form>
    </>
  );
}
