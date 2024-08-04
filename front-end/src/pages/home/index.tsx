import { useEffect } from "react";
import Header from "../../components/header";
import "./style.css";

const Home = () => {
    useEffect(() => {
        document.getElementById("home")?.classList.add("selected-icon");

        return () => {
            document.getElementById("home")?.classList.remove("selected-icon");
        }
    })

    
    return <>
    <Header />
    </>;
};

export default Home;
