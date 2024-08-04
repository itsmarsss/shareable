import { useEffect } from "react";
import "./style.css";
import Header from "../../components/header";

const Create = () => {
    useEffect(() => {
        document.getElementById("create")?.classList.add("selected-icon");

        return () => {
            document.getElementById("create")?.classList.remove("selected-icon");
        }
    })
    return <><Header /></>;
};

export default Create;
