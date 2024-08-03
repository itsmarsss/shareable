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
import LandingPage from "./pages/landingPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route element={<Nav />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
