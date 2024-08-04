import { useEffect } from "react";
import "./style.css";

const Create = () => {
    useEffect(() => {
        document.getElementById("create")?.classList.add("selected-icon");

        return () => {
            document.getElementById("create")?.classList.remove("selected-icon");
        }
    })
    return <></>;
};

export default Create;
