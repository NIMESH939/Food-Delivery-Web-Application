import React, { useState } from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";

const NavBar = () => {
  const [menu, setMenu] = useState("Home");

  return (
    <div className="navbar">
      <img src={assets.logo} className="logo" alt="Logo" />
      <ul className="navbar-menu">
        <li onClick={()=> setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</li>
        <li onClick={()=> setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</li>
        <li onClick={()=> setMenu("Mobile App")} className={menu === "Mobile App" ? "active" : ""}>Mobile App</li>
        <li onClick={()=> setMenu("Contact Us")} className={menu === "Contact Us" ? "active" : ""}>Contact Us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search Icon" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button>sign in</button>
      </div>
    </div>
  );
};

export default NavBar;
