import { useEffect } from "react";
import BlogPost from "../../components/blogPost";
import "./style.css";

const Home = () => {
    useEffect(() => {
        document.getElementById("home")?.classList.add("selected-icon");

        return () => {
            document.getElementById("home")?.classList.remove("selected-icon");
        };
    });

    return (
        <>
            <BlogPost />
        </>
    );
};

export default Home;
