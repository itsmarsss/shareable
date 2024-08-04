import { ChangeEvent, useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/header";
import ImageUpload from "../../components/itemTagImageUpload";
import Shareable from "../../models/shareable.model";
import { useAuth } from "../../components/authProvider";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";

const Create = () => {
    useEffect(() => {
        document.getElementById("create")?.classList.add("selected-icon");

        return () => {
            document
                .getElementById("create")
                ?.classList.remove("selected-icon");
        };
    });

    const [shareable, setShareable] = useState<Shareable>({
        id: "",
        name: "",
        description: "",
        date: Date.now(),
        images: [],
        price: 0,
        shareCount: 0,
        shareHolders: [],
        location: "",
    });

    const auth = useAuth();
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>("");

    const handleUploadItemTag = (name: string, price: number) => {
        setShareable((prevData) => ({
            ...prevData,
            name: name,
            price: price,
        }));
        console.log(name + " " + price);
    };

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setShareable((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setSelectedFile(file);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setUploadStatus("Please select a file first.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = async () => {
            const fileString = reader.result as string;

            setShareable((prevData) => ({
                ...prevData,
                images: [fileString],
            }));
            setUploadStatus("Uploaded successfully.");
        };
        reader.readAsDataURL(selectedFile);
    };
    const handleSubmit = async () => {
        try {
            console.log("1");
            const response = await fetch("/api/marketplace/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify({
                    ...shareable,
                }),
            });
            console.log("2");
            const res = await response.json();
            console.log("3");
            if (res.success) {
                navigate("/home");
                return;
            } else {
                console.log(res);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div className="container">
            <Header />
            <div className="content">
                <label>Upload image of the price tag:</label>
                <ImageUpload onUploadSuccess={handleUploadItemTag} />
                    <div>
                        <label>Item Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={shareable.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={shareable.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={shareable.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Share Count:</label>
                        <input
                            type="number"
                            name="shareCount"
                            value={shareable.shareCount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Purchased From Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={shareable.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Upload Images:</label>
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleFileChange}
                        />
                        <Button onClick={handleFileUpload}>Upload</Button>
                        {uploadStatus && <p>{uploadStatus}</p>}
                    </div>
                    <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default Create;
