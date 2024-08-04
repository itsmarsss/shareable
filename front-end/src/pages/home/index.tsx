import { useEffect, useState } from "react";
import BlogPost from "../../components/blogPost";
import "./style.css";
import Header from "../../components/header";
import { useAuth } from "../../components/authProvider";
import Shareable from "../../models/shareable.model";

const Home = () => {
    useEffect(() => {
        document.getElementById("home")?.classList.add("selected-icon");
        getPosts();
        return () => {
            document.getElementById("home")?.classList.remove("selected-icon");
        };
    }, []);

    const auth = useAuth();
    const [posts, setPosts] = useState<Shareable[]>([]);

    const getPosts = async () => {
        const response = await fetch("api/marketplace/feed", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
        });

        const res = await response.json();
        console.log(res);

        if (res.success) {
            res.shareables.forEach(async (id: string) => {
                const response = await fetch("api/marketplace/" + id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.token}`,
                    },
                });

                const res = await response.json();
                if (res.success) {
                    setPosts((prevPosts) => [...prevPosts, res.shareableItem]);
                }
            });
        }
    };

    return (
        <div className="container">
            <Header />
            <div className="content">
                {posts.length > 0 ? (
                    posts.map((shareable, index) => (
                        <BlogPost
                            key={shareable.id + index}
                            shareable={shareable}
                        />
                    ))
                ) : (
                    <h2>No posts available</h2>
                )}
            </div>
        </div>
    );
};

export default Home;
