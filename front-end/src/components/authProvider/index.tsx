import { useState, createContext, ReactNode, FC, useContext } from "react";
import User from "../../models/user.model";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: User | undefined;
    token: string;
    signIn: (username: string, password: string) => Promise<void>;
    signUp: (
        username: string,
        password: string,
        displayName: string
    ) => Promise<void>;
    signOut: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
    user: undefined,
    token: "",
    signIn: async () => {
        console.log("uninitialized sign in");
    },
    signUp: async () => {
        console.log("unintialized sign up");
    },
    signOut: () => {
        console.log("uninitialized sign out");
    },
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<undefined | User>(undefined);
    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    ); // replace 'token' with '' for production
    const navigate = useNavigate();

    const signIn = async (username: string, password: string) => {
        try {
            const response = await fetch("/api/profile/signin", {
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

            if (res.success) {
                setUser(res.user);
                setToken(res.token);
                localStorage.setItem("token", res.token);
                console.log(res + " signed in.");

                navigate("/home");
                return;
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
            const response = await fetch("/api/profile/signup", {
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

            if (res.success) {
                setUser(res.user);
                setToken(res.token);
                localStorage.setItem("token", res.token);
                console.log(res.user.username + " signed in.");

                navigate("/home");
                return;
            }

            throw new Error(res.message);
        } catch (err) {
            console.error(err);
        }
    };

    const signOut = async () => {
        try {
            const response = await fetch("/api/profile/signout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    token: token,
                }),
            });
            const res = await response.json();

            if (res.success) {
                localStorage.removeItem("token");
                setUser(undefined);
                setToken("");
                navigate("/");
                console.log(user?.username + " signed out.");

                navigate("/");
                return;
            }

            throw new Error(res.message);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
