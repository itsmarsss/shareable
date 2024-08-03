import "./style.css";
import { useState } from "react";
import Input from "../../components/input";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { useAuth } from "../../components/authProvider";

const LandingPage = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (userName !== "" && password !== "") {
      auth.signIn(userName, password);
      return;
    }
    alert("pleae provide a valid input");
  }

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
      <form onSubmit={handleSubmit}>
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
      <input id="login" type="submit" onClick={() => {}}>
        Login
      </input>
      <Button id="signup" onClick={NavigateSignUp}>
        Sign Up
      </Button>
      </form>
    </div>
  );
};

export default LandingPage;
