import { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/header";
import Input from "../../components/input";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        document.getElementById("search")?.classList.add("selected-icon");

        return () => {
            document
                .getElementById("search")
                ?.classList.remove("selected-icon");
        };
    }, []); // Added empty dependency array to run only on mount/unmount

    return (
        <>
            <Header />
            <Input
                value={searchQuery}
                onChange={handleSearchChange}
                className="input-field-search"
            />
        </>
    );
};

export default Search;
