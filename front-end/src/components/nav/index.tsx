import "./style.css";
import React from "react";
import type IconType from "react-icons";
import { MdHome, MdAddBox, MdSearch, MdPerson } from "react-icons/md";

interface NavIconProps {
  icon: IconType.IconType;
  title: string;
  color?: string;
  size?: string | number;
}

const NavIcon: React.FC<NavIconProps> = ({
  icon: Icon,
  title,
  size,
}) => {
  return (
    <div className="nav-icon">
      <Icon size={size} />
      <h2>{title}</h2>
    </div>
  );
};

const Nav = () => {
  return (
    <nav id="nav">
      <NavIcon size={24} title="Home" icon={MdHome} />
      <NavIcon size={24} title="Create" icon={MdAddBox} />
      <NavIcon size={24} title="Search" icon={MdSearch} />
      <NavIcon size={24} title="Profile" icon={MdPerson} />
    </nav>
  );
};

export default Nav;
