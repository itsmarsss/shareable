import "./style.css";
import Input from "../../components/input";
import Button from "../../components/button";
import { useReducer } from "react";
import { State, Action } from "./types";
import icon from "../../../public/favicon.svg";
import { useAuth } from "../../components/authProvider";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "change_display_name":
      return { ...state, displayName: action.payload };
    case "change_username":
      return { ...state, userName: action.payload };
    case "set_password":
      return { ...state, password: action.payload };
    case "set_confirm_password":
      return { ...state, confirmPassword: action.payload };
    default:
      return state;
  }
};

const SignUp = () => {
  const [state, dispatch] = useReducer(reducer, {
    displayName: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const auth = useAuth();

  const handleSubmit = () => {
    if (state.password !== state.confirmPassword) {
      alert("Password does not match.");
      return;
    }

    if (state.userName === "" || state.displayName === "" || state.password !== "" || state.confirmPassword !== "") {
      alert("Please fill out all fields.");
      return;
    }

    auth.signUp(state.userName, state.password, state.displayName);
  };

  return (
    <div className="panel-sign-up">
      <img src={icon} alt="" />
      <h1>Create your account!</h1>
      <h2>
        Sign up to see postings from your environmental friendly neighbours!
      </h2>
      <Input
        placeholder="Display Name"
        value={state.displayName}
        onChange={(e) =>
          dispatch({ type: "change_display_name", payload: e.target.value })
        }
      />
      <Input
        placeholder="Username"
        value={state.userName}
        onChange={(e) =>
          dispatch({ type: "change_username", payload: e.target.value })
        }
      />
      <Input
        placeholder="Password"
        value={state.password}
        onChange={(e) =>
          dispatch({ type: "set_password", payload: e.target.value })
        }
      />
      <Input
        placeholder="Confirm Password"
        value={state.confirmPassword}
        onChange={(e) =>
          dispatch({ type: "set_confirm_password", payload: e.target.value })
        }
      />
      <Button onClick={handleSubmit} id="button-sign-up">
        Sign Up
      </Button>
    </div>
  );
};

export default SignUp;
