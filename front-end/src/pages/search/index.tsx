import { useEffect } from "react";
import "./style.css";

const Search = () => {
    useEffect(() => {
        document.getElementById("search")?.classList.add("selected-icon");

        return () => {
            document.getElementById("search")?.classList.remove("selected-icon");
        }
    })
    return <></>;
};

export default Search;
