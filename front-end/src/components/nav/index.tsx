import "./style.css";
import React from "react";
import type IconType from "react-icons";
import { MdHome, MdAddBox, MdSearch, MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface NavIconProps {
  icon: IconType.IconType;
  title: string;
  color?: string;
  size?: string | number;
  href: string;
  id: string;
}

const NavIcon: React.FC<NavIconProps> = ({
  icon: Icon,
  title,
  size,
  href,
  id
}) => {
  const navigate = useNavigate();
  return (
    <button id={id} className="nav-icon" onClick={() => navigate(href)}>
      <Icon size={size} />
      <h2>{title}</h2>
    </button>
  );
};

const Nav = () => {
  return (
    <nav className="bottom-nav">
      <NavIcon size={24} id="home" href="/home" title="Home" icon={MdHome} />
      <NavIcon size={24} id="create" href="/create" title="Create" icon={MdAddBox} />
      <NavIcon size={24} id="search" href="/search" title="Search" icon={MdSearch} />
      <NavIcon size={24} id="profile" href="/profile" title="Profile" icon={MdPerson} />
    </nav>
  );
};

export default Nav;
