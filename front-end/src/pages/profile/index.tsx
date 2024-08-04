import { useEffect } from "react";
import "./style.css";
import Header from "../../components/header";
import { useAuth } from "../../components/authProvider";
import Button from "../../components/button";
import ProfileImage from "../../components/profileImage";

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
        <ProfileImage profileB64="" size={100} />
        <Button onClick={auth.signOut}>
            Sign out
        </Button>
    </header>;
};

export default Profile;
