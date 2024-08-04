import { useEffect } from "react";
import "./style.css";
import Header from "../../components/header";
import { useAuth } from "../../components/authProvider";
import Button from "../../components/button";
import ProfileImage from "../../components/profileImage";

const Profile = () => {
    const auth = useAuth();
    const user = auth.user;

    useEffect(() => {
        const profileElement = document.getElementById("profile");
        profileElement?.classList.add("selected-icon");

        return () => {
            profileElement?.classList.remove("selected-icon");
        };
    }, []);

    return (
        <div>
            <Header />
            <div className="profile-wrapper">
                <div className="profile-section">
                    <ProfileImage
                        profileB64={user?.profileB64 || ""}
                        size={100}
                    />
                    <div className="text-section">
                        <h1 className="display-name">{user?.displayName}</h1>
                        <h2 className="username">@{user?.username}</h2>
                    </div>
                </div>
                <Button className="sign-out-button" onClick={auth.signOut}>
                    Sign out
                </Button>
            </div>
        </div>
    );
};

export default Profile;
