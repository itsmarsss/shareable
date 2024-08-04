import { useEffect } from "react";
import "./style.css";
import Header from "../../components/header";

const Search = () => {
    useEffect(() => {
        document.getElementById("search")?.classList.add("selected-icon");

        return () => {
            document
                .getElementById("search")
                ?.classList.remove("selected-icon");
        };
    });
    return (
        <>
            <Header />
        </>
    );
};

export default Search;
