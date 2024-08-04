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

    const handleSubmit = () => {
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
                <h1 id="landing-page-welcome-h1">Welcome Back!</h1>
                <Input
                    value={userName}
                    onChange={handleChange}
                    id="username-input"
                    className="user-info"
                    placeholder="Enter Username"
                />
                <Input
                    value={password}
                    onChange={handleChange}
                    id="password-input"
                    className="user-info"
                    placeholder="Enter Password"
                    type="password"
                />
                <Button id="landing-page-login-button" onClick={handleSubmit}>
                    Log in
                </Button>
                <div className="or-hr">
                    <hr className="hr-width"></hr>
                    <p>OR</p>
                    <hr className="hr-width"></hr>
                </div>
                <p>
                    Sign up for a
                    <Button
                        id="landing-page-signup-button"
                        onClick={NavigateSignUp}
                    >
                        new account
                    </Button>
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
