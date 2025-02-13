import { useState } from "react";
import NavLoggedIn from "./NavLoggedIn";
import NavLoggedOut from "./NavLoggedOut";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className="bg-blue-900 h-24">
      {isLoggedIn ? <NavLoggedIn /> : <NavLoggedOut />}
    </div>
  );
}

export default Navbar;
