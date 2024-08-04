import { useEffect } from "react";
import "./style.css";

const Profile = () => {
    useEffect(() => {
        document.getElementById("profile")?.classList.add("selected-icon");

        return () => {
            document.getElementById("profile")?.classList.remove("selected-icon");
        }
    })
    return <header></header>;
};

export default Profile;
