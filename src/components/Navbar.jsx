import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../lib/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
const Navbar = () => {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  return (
    <nav className="w-screen md:max-w-[50%] md:mx-auto bg-white md:rounded-lg">
      <ul className="flex justify-around">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/createpost">Upload</Link>
        </li>

        <li>
          <Link to="/profile">
            <div>
              {/* <p className="text-sm">{auth.currentUser?.displayName}</p> */}
              <img
                className="text-sm rounded-full"
                src={auth.currentUser?.photoURL}
                width="50"
                height="50"
              />
            </div>
          </Link>
        </li>

        {!user ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
