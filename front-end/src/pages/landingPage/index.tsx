import "./style.css";
import { useState } from "react";
import Input from "../../components/input";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";

const LandingPage = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.id === "username-input"
      ? setUsername(event.target.value)
      : setPassword(event.target.value);
  };

  const NavigateSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <div className="panel">
      <h1>Welcome to our website (change later)</h1>
      <Input
        value={userName}
        onChange={handleChange}
        id="username-input"
        className="user-info"
      />
      <Input
        value={password}
        onChange={handleChange}
        id="password-input"
        className="user-info"
      />
      <Button id="login" onClick={() => {}}>
        Login
      </Button>
      <Button id="signup" onClick={NavigateSignUp}>
        Sign Up
      </Button>
    </div>
  );
};

export default LandingPage;
