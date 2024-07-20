import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase.js";

const Navbar = () => {
  return (
    <nav className="w-screen">
      <ul className="flex justify-around">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/upload">Upload</Link>
        </li>

        <li>
          <Link to="/profile">
            <div>
              <p>{auth.currentUser?.displayName}</p>
              <img src={auth.currentUser?.photoURL} />
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
