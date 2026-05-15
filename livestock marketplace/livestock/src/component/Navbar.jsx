import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className=" shadow-lg border font-semibold">
      <div className="flex justify-between   py-4 container mx-auto">
        <div>image</div>
        <div>
          <ul className="flex items-center gap-1">
            <li>
              {" "}
              <Link href={"/"}>Home</Link>{" "}
            </li>
            <li>
              {" "}
              <Link href={"/all-animals"}> All Animals</Link>{" "}
            </li>
            <li>
              {" "}
              <Link href={"/profile"}>My profile</Link>{" "}
            </li>
          </ul>
        </div>
        <div className="flex gap-2 items-center list-none">
          <li>
            {" "}
            <Link href={"/login"}>Login</Link>{" "}
          </li>
          <li>
            {" "}
            <Link href={"/logout"}>Logout</Link>{" "}
          </li>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
