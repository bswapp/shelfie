import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <Link className="link iconTitle" to="/">
        <img />
        <span className="title">SHELFIE</span>
      </Link>

      <button className="headerButton">
        <Link className="link" to="/">
          Dashboard
        </Link>
      </button>
      <button className="headerButton">
        <Link className="link" to="/add">
          Add Inventory
        </Link>
      </button>
    </nav>
  );
}

export default Header;
