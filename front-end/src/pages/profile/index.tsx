import { useEffect } from "react";
import "./style.css";
import Header from "../../components/header";
import { useAuth } from "../../components/authProvider";
import Button from "../../components/button";

const Profile = () => {
    useEffect(() => {
        document.getElementById("profile")?.classList.add("selected-icon");

        return () => {
            document.getElementById("profile")?.classList.remove("selected-icon");
        }
    })

    const auth = useAuth();
    const user = auth.user;

    return <header>
        <Header />
        <h1>hello, {user?.displayName}</h1>
        <Button onClick={auth.signOut}>
            Sign out
        </Button>
    </header>;
};

export default Profile;
