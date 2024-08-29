import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Deliciousness Delivered to Your Doorstep! Explore a world of flavors
          with our quick and easy food delivery service. Fresh meals from your
          favorite restaurants,
          <br /> just a click away!
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
