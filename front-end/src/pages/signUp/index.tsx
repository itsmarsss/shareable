import "./style.css";
import Input from "../../components/input";
import Button from "../../components/button";
import { useReducer } from "react";
import { State, Action } from "./types";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "change_first_name":
      return { ...state, firstName: action.payload };
    case "change_last_name":
      return { ...state, lastName: action.payload };
    case "change_username":
      return { ...state, userName: action.payload };
    case "change_email":
      return { ...state, email: action.payload };
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
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="panel">
      <Input
        value={state.firstName}
        onChange={(e) =>
          dispatch({ type: "change_first_name", payload: e.target.value })
        }
        className="names"
        title="First Name:"
      />
      <Input
        value={state.lastName}
        onChange={(e) =>
          dispatch({ type: "change_last_name", payload: e.target.value })
        }
        className="names"
        title="Last Name:"
      />
      <Input
        value={state.userName}
        onChange={(e) =>
          dispatch({ type: "change_username", payload: e.target.value })
        }
        title="Set Username:"
      />
      <Input
        value={state.email}
        onChange={(e) =>
          dispatch({ type: "change_email", payload: e.target.value })
        }
        id="email"
        title="Email:"
      />
      <Input
        value={state.password}
        onChange={(e) =>
          dispatch({ type: "set_password", payload: e.target.value })
        }
        title="Set Password:"
      />
      <Input
        value={state.confirmPassword}
        onChange={(e) =>
          dispatch({ type: "set_confirm_password", payload: e.target.value })
        }
        title="Confirm Password:"
      />
      <Button onClick={() => {}}>Sign Up</Button>
    </div>
  );
};

export default SignUp;
