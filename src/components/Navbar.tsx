"use client";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  console.log("data", session);
  return (
    <div className="h-[8vh] bg-gray-400 w-full flex justify-between pe-10 ps-6 items-center ">
      <p className="text-3xl text-white">Inventory</p>
      <p
        className="text-3xl text-white cursor-pointer"
        onClick={() => {
          session ? signOut() : "";
        }}
      >
        {session ? "Signout" : "Sign in first"}
      </p>
    </div>
  );
};

export default Navbar;
