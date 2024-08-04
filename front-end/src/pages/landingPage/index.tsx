import "./style.css";
import { useState } from "react";
import Input from "../../components/input";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import { useAuth } from "../../components/authProvider";
import icon from "../../../public/favicon.svg";

const LandingPage = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (userName !== "" && password !== "") {
      auth.signIn(userName, password);
      return;
    }
    alert("please provide a valid input");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.id === "username-input"
      ? setUsername(event.target.value)
      : setPassword(event.target.value);
  };

  const NavigateSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <div className="panel-log-in-background">
      <div className="panel-log-in">
        <img src={icon} id="img-landing-page" />
        <h1 id="landing-page-welcome-h1">
          Welcome to our website (change later)
        </h1>
        <form onSubmit={handleSubmit} className="form-div-landing-page">
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
          <div className="or-hr">
            <hr className="hr-width"></hr>
            <p>OR</p>
            <hr className="hr-width"></hr>
          </div>
          <button id="landing-page-login-button" type="submit">
            Log in
          </button>
          <Button id="landing-page-signup-button" onClick={NavigateSignUp}>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
