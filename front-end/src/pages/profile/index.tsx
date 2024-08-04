import { useEffect } from "react";
import "./style.css";
import Header from "../../components/header";

const Profile = () => {
    useEffect(() => {
        document.getElementById("profile")?.classList.add("selected-icon");

        return () => {
            document.getElementById("profile")?.classList.remove("selected-icon");
        }
    })
    return <header>
        <Header />
    </header>;
};

export default Profile;
