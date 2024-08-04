import "./style.css";
import Button from "../../components/button";
import { useState } from "react";

const ProfileVisit = () => {
    const [isFollowing, setIsFollowing] = useState(false);

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    const user = {
        displayName: "John Doe",
        username: "@johndoe",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae nisi.",
        profileB64: "",
    };

    return (
        <>
            <div className="profile-visit-wrapper">
                <div className="profile-visit-details">
                    <img
                        src={`data:image/png;base64,${user.profileB64}`}
                        alt="Profile"
                        className="profile-visit-img"
                    />
                    <div className="profile-visit-info">
                        <h1 className="profile-visit-name">
                            {user.displayName}
                        </h1>
                        <h2 className="profile-visit-username">
                            {user.username}
                        </h2>
                        <p className="profile-visit-bio">{user.bio}</p>
                    </div>
                </div>
                <Button
                    className="profile-visit-action-btn"
                    onClick={toggleFollow}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </Button>
            </div>
        </>
    );
};

export default ProfileVisit;
