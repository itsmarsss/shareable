import { useEffect } from "react";
import BlogPost from "../../components/blogPost";
import "./style.css";
import Header from "../../components/header";

const Home = () => {
    useEffect(() => {
        document.getElementById("home")?.classList.add("selected-icon");

        return () => {
            document.getElementById("home")?.classList.remove("selected-icon");
        };
    });

    return (
        <div className="container">
            <Header />
            <div className="content">
                <BlogPost />
                <BlogPost />
            </div>
        </div>
    );
};

export default Home;
