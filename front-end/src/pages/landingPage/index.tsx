import "./style.css";
import { useState } from "react";

const LandingPage = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.id === "username-input"
      ? setUsername(event.target.value)
      : setPassword(event.target.value);
  };

  return (
    <div className="panel">
      <h1>Welcome to our website (change later)</h1>
      <input
        value={userName}
        onChange={handleChange}
        id="username-input"
        className="user-info"
      />
      <input
        value={password}
        onChange={handleChange}
        id="password-input"
        className="user-info"
      />
      <button id="login">Login</button>
      <button id="signup">Sign Up</button>
    </div>
  );
};

export default LandingPage;
