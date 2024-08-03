import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/nav";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Search from "./pages/search";
import Create from "./pages/create";
import PageNotFound from "./pages/pageNotFound";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Nav />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/search" element={<Search />} />
                <Route path="/create" element={<Create />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
