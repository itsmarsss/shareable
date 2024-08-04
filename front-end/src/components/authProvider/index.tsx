import { useState, createContext, ReactNode, FC, useContext } from "react";
import User from "../../models/user.model";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | undefined;
  token: string;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string, displayName: string) => Promise<void>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  token: "",
  signIn: async () => {console.log("uninitialized sign in")},
  signUp: async () => {console.log("unintialized sign up")},
  signOut: () => {console.log("uninitialized sign out")},
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<undefined | User>(undefined);
  const [token, setToken] = useState(localStorage.getItem("token") || "token"); // replace 'token' with ''
  const navigate = useNavigate();

  const signIn = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const res = await response.json();

      if (res.data.success) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("token", res.token);

        navigate("/home");
      }

      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
    console.log("sign in");
  };

  const signUp = async (
    username: string,
    password: string,
    displayName: string
  ) => {
    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          displayName: displayName,
          password: password,
        }),
      });
      const res = await response.json();

      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("token", res.token);

        navigate("/home");
      }

      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(undefined);
    setToken("");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing the context
export const useAuth = () => {
  return useContext(AuthContext);
};
