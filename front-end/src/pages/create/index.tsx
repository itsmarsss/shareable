import { useEffect } from "react";
import "./style.css";
import Header from "../../components/header";
import ImageUpload from "../../components/itemTagImageUpload";
import Shareable from "../../models/shareable.model";

const Create = () => {
    useEffect(() => {
        document.getElementById("create")?.classList.add("selected-icon");

        return () => {
            document
                .getElementById("create")
                ?.classList.remove("selected-icon");
        };
    });

    const shareable: Shareable = {
        id: "",
        name: "",
        description: "",
        date: 0,
        images: [],
        price: 0,
        shareCount: 0,
        shareHolders: [],
        location: "",
    };

    const handleUploadItemTag = (name: string, price: number) => {
        shareable.name = name;
        shareable.price = price;
        console.log(name + " " + price);
    };

    return (
        <div className="container">
            <Header />
            <div className="content">
                <ImageUpload onUploadSuccess={handleUploadItemTag} />
            </div>
        </div>
    );
};

export default Create;
